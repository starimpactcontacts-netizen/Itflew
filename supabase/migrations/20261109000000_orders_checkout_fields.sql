alter table public.orders
  add column if not exists quantity int,
  add column if not exists amount_total int,
  add column if not exists currency text default 'usd',
  add column if not exists payment_intent text unique,
  add column if not exists shipping jsonb;

-- 10% welcome offer: on the email list and no paid order yet. Returns only a boolean.
create or replace function public.welcome_discount_eligible(p_email text)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.waitlist w where lower(w.email) = lower(trim(p_email)))
     and not exists (select 1 from public.orders o where lower(o.email) = lower(trim(p_email)) and o.status <> 'cancelled');
$$;
revoke all on function public.welcome_discount_eligible(text) from public;
grant execute on function public.welcome_discount_eligible(text) to anon, authenticated;
