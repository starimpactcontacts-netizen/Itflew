create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  email text not null check (length(email) <= 254),
  topic text check (length(topic) <= 60),
  message text not null check (length(message) between 1 and 4000),
  page text check (length(page) <= 300),
  status text not null default 'new' check (status in ('new', 'replied', 'closed')),
  created_at timestamptz not null default now()
);
alter table public.support_messages enable row level security;
-- no policies: only the server (service role) reads or writes.

revoke execute on function public.track_order(text, text) from anon, authenticated;
revoke execute on function public.welcome_discount_eligible(text) from anon, authenticated;
grant execute on function public.track_order(text, text) to service_role;
grant execute on function public.welcome_discount_eligible(text) to service_role;
