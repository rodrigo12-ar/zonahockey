create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text not null check (category in ('palos', 'patines', 'bolsos', 'accesorios')),
  subcategory text null check (subcategory in ('plancha', 'botas', 'patin-completo', 'accesorios')),
  price integer not null default 0,
  short_description text not null,
  long_description text not null,
  image text not null,
  promotion_text text null,
  stock integer not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_slug_idx on public.products (slug);
create index if not exists products_featured_idx on public.products (featured);

create or replace function public.set_products_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;

create trigger products_set_updated_at
before update on public.products
for each row
execute function public.set_products_updated_at();
