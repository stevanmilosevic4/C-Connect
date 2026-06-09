-- ============================================================
-- C>Connect — Supabase schema (vertical slice: ambassador submissions)
-- Paste this whole file into the Supabase SQL editor and run it once.
--
-- DEMO-GRADE SECURITY: there is no auth yet, so the policies below let the
-- public `anon` key insert / read / review submissions. This is intentional
-- for the shareable no-login prototype. When real auth lands, replace these
-- policies with per-user / role-scoped rules.
-- ============================================================

-- 1) Submissions table -------------------------------------------------------
create table if not exists public.submissions (
  id              uuid primary key default gen_random_uuid(),
  kind            text not null check (kind in ('video', 'reimbursement')),
  ambassador_name text,
  role            text,
  title           text,
  note            text,
  amount          numeric,
  file_path       text,                         -- path inside the `submissions` bucket
  status          text not null default 'pending'
                    check (status in ('pending', 'approved', 'declined')),
  reviewed_by     text,
  created_at      timestamptz not null default now(),
  reviewed_at     timestamptz
);

create index if not exists submissions_status_idx on public.submissions (status, created_at desc);

alter table public.submissions enable row level security;

-- demo policies (replace when auth is added) --------------------------------
drop policy if exists "demo anon insert submissions" on public.submissions;
create policy "demo anon insert submissions"
  on public.submissions for insert to anon with check (true);

drop policy if exists "demo anon select submissions" on public.submissions;
create policy "demo anon select submissions"
  on public.submissions for select to anon using (true);

drop policy if exists "demo anon update submissions" on public.submissions;
create policy "demo anon update submissions"
  on public.submissions for update to anon using (true) with check (true);

-- 2) Storage bucket for the uploaded files -----------------------------------
insert into storage.buckets (id, name, public)
values ('submissions', 'submissions', false)
on conflict (id) do nothing;

-- demo storage policies (replace when auth is added) -------------------------
drop policy if exists "demo anon upload submissions" on storage.objects;
create policy "demo anon upload submissions"
  on storage.objects for insert to anon
  with check (bucket_id = 'submissions');

drop policy if exists "demo anon read submissions" on storage.objects;
create policy "demo anon read submissions"
  on storage.objects for select to anon
  using (bucket_id = 'submissions');
