create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and length(email) <= 254),
  created_at timestamptz not null default now()
);
alter table public.waitlist enable row level security;
create policy "Anyone can join the waitlist"
  on public.waitlist for insert to anon, authenticated
  with check (true);
