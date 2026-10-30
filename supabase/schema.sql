-- Lead storage for the Zenyro website. Run in the Supabase SQL editor.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  business text not null,
  email text not null,
  phone text,
  website text,
  industry text not null,
  budget text not null,
  challenge text not null,
  source_page text,
  user_agent text,
  status text not null default 'new'
);

-- Row Level Security on, with no public policies: only the server (service role key) can read or write.
alter table public.leads enable row level security;

-- Tool-led acquisition (safe to run on an existing table).
alter table public.leads add column if not exists source text not null default 'contact-form';
alter table public.leads add column if not exists intent text not null default 'enquiry';
alter table public.leads add column if not exists services text[] not null default '{}';
alter table public.leads add column if not exists details jsonb not null default '{}'::jsonb;
alter table public.leads add column if not exists utm_source text;
alter table public.leads add column if not exists utm_medium text;
alter table public.leads add column if not exists utm_campaign text;
alter table public.leads add column if not exists referrer text;
alter table public.leads add column if not exists landing_page text;
alter table public.leads add column if not exists status_updated_at timestamptz;
alter table public.leads add column if not exists qualified_at timestamptz;
alter table public.leads add column if not exists won_at timestamptz;
-- Status values used by the admin view: new, contacted, qualified, proposal, won, lost.
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
