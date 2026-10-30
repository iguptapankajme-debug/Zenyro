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
