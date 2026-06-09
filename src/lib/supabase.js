// C>Connect — Supabase client.
// Reads config from Vite env vars (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).
// When they are absent the app runs in demo mode: `supabase` is null and
// `isBackendConfigured` is false, so the API layer falls back to mock behaviour
// and the shareable no-login demo keeps working with zero backend.
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isBackendConfigured = Boolean(url && anonKey);

export const supabase = isBackendConfigured
  ? createClient(url, anonKey, { auth: { persistSession: false } })
  : null;
