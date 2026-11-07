create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  email text not null,
  status text not null default 'processing'
    check (status in ('processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled')),
  carrier text,
  tracking_number text,
  tracking_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.orders enable row level security;
-- No policies: the public can never read the table directly.

create index orders_lookup_idx on public.orders (upper(order_number), lower(email));

-- Customers look up one order by number + the email it was placed with.
create function public.track_order(p_order_number text, p_email text)
returns table (
  order_number text, status text, carrier text, tracking_number text,
  tracking_url text, created_at timestamptz, updated_at timestamptz
)
language sql stable security definer set search_path = ''
as $$
  select o.order_number, o.status, o.carrier, o.tracking_number, o.tracking_url, o.created_at, o.updated_at
  from public.orders o
  where upper(o.order_number) = upper(trim(p_order_number))
    and lower(o.email) = lower(trim(p_email))
  limit 1;
$$;
revoke all on function public.track_order(text, text) from public;
grant execute on function public.track_order(text, text) to anon, authenticated;
