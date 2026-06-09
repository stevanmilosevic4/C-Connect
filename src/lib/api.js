// C>Connect — data API. The only module screens import for backend work.
// Every function degrades gracefully when the backend isn't configured, so the
// no-login demo keeps working exactly as before.
import { supabase, isBackendConfigured } from './supabase.js';
import { notifications } from '../data.js';

export { isBackendConfigured };

const BUCKET = 'submissions';
export const MAX_VIDEO_BYTES = 200 * 1024 * 1024; // 200 MB — free tier is 1 GB total

// Build a safe storage path: submissions/<kind>/<random>-<filename>
function storagePath(kind, file) {
  const safe = (file?.name || 'upload').replace(/[^\w.\-]+/g, '_').slice(-80);
  const rand = (crypto?.randomUUID?.() || String(Date.now() + Math.round(performance.now())));
  return `${kind}/${rand}-${safe}`;
}

// Upload a file + insert a submissions row. In demo mode this resolves to a
// fake row without touching any backend (today's simulated behaviour).
export async function submitWork({ kind, file, meta = {} }) {
  if (kind === 'video' && file && file.size > MAX_VIDEO_BYTES) {
    const mb = Math.round(MAX_VIDEO_BYTES / (1024 * 1024));
    throw new Error(`That video is too large. Please keep it under ${mb} MB.`);
  }
  if (!isBackendConfigured) {
    return { id: 'demo', kind, status: 'pending', ...meta, demo: true };
  }

  let file_path = null;
  if (file) {
    file_path = storagePath(kind, file);
    const { error: upErr } = await supabase.storage.from(BUCKET).upload(file_path, file, {
      cacheControl: '3600', upsert: false, contentType: file.type || undefined,
    });
    if (upErr) throw new Error(upErr.message || 'Upload failed. Please try again.');
  }

  const row = {
    kind,
    ambassador_name: meta.ambassadorName || null,
    role: meta.role || null,
    title: meta.title || null,
    note: meta.note || null,
    amount: meta.amount ?? null,
    file_path,
    status: 'pending',
  };
  const { data, error } = await supabase.from('submissions').insert(row).select().single();
  if (error) throw new Error(error.message || 'Could not save your submission.');
  return data;
}

// Map a DB submission row to the shape the Notifications UI expects.
function toNotification(row) {
  const isVideo = row.kind === 'video';
  return {
    id: row.id,
    icon: isVideo ? 'camera' : 'dollar',
    color: isVideo ? 'var(--cu-mobility-blue)' : 'var(--cu-shiny-yellow)',
    title: isVideo ? 'Video submitted' : 'Reimbursement request',
    sub: isVideo
      ? `${row.ambassador_name || 'An ambassador'} · Day in the life · approve €${row.amount ?? 25} reward`
      : `${row.ambassador_name || 'An ambassador'} · ${row.note || 'printing'} · receipt attached`,
    when: 'just now',
    kind: 'approval',
    amount: row.amount ?? (isVideo ? 25 : 0),
    file_path: row.file_path || null,
  };
}

// Pending submissions for the RM queue. Falls back to the mock RM list when
// the backend isn't configured.
export async function listPendingSubmissions() {
  if (!isBackendConfigured) return notifications.rm;
  const { data, error } = await supabase
    .from('submissions').select('*').eq('status', 'pending')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message || 'Could not load submissions.');
  return data.map(toNotification);
}

// Approve / decline a submission. No-op (success) in demo mode.
export async function reviewSubmission(id, status, reviewer = 'Regional Manager') {
  if (!isBackendConfigured || id === 'demo') return { id, status };
  const { data, error } = await supabase.from('submissions')
    .update({ status, reviewed_by: reviewer, reviewed_at: new Date().toISOString() })
    .eq('id', id).select().single();
  if (error) throw new Error(error.message || 'Could not update the submission.');
  return data;
}

// Short-lived signed URL so the RM can view a stored file.
export async function signedUrl(path, expiresIn = 600) {
  if (!isBackendConfigured || !path) return null;
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, expiresIn);
  if (error) return null;
  return data?.signedUrl || null;
}
