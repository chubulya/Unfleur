-- Unfleur database foundation for Supabase.
-- Uses Supabase Auth user ids and Row Level Security for private journals.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text not null default '',
  purpose text not null default '',
  notifications_enabled boolean not null default true,
  language text not null default 'en' check (language in ('en', 'ua')),
  onboarded boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_date date not null default current_date,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id)
);

create index journal_entries_user_date_idx
  on journal_entries(user_id, entry_date desc);

create table entry_moodlets (
  entry_id uuid not null references journal_entries(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  moodlet_name text not null,
  position smallint not null default 0,
  primary key (entry_id, moodlet_name),
  foreign key (entry_id, user_id) references journal_entries(id, user_id) on delete cascade
);

create index entry_moodlets_user_idx
  on entry_moodlets(user_id);

create index entry_moodlets_entry_user_idx
  on entry_moodlets(entry_id, user_id);

create table bloomy_states (
  user_id uuid primary key references auth.users(id) on delete cascade,
  pot text not null default 'blue',
  admin_visit_day smallint not null default 1 check (admin_visit_day between 1 and 7),
  skipped_journal_days smallint not null default 0 check (skipped_journal_days between 0 and 2),
  mock_data_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table local_imports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  imported_at timestamptz not null default now(),
  source_storage_key text not null default 'unfleur-state',
  entry_count integer not null default 0
);

create index local_imports_user_idx
  on local_imports(user_id);

create trigger profiles_set_updated_at
  before update on profiles
  for each row execute function public.set_updated_at();

create trigger journal_entries_set_updated_at
  before update on journal_entries
  for each row execute function public.set_updated_at();

create trigger bloomy_states_set_updated_at
  before update on bloomy_states
  for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, email, name, purpose, language)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'purpose', ''),
    coalesce(new.raw_user_meta_data->>'language', 'en')
  )
  on conflict (user_id) do nothing;

  insert into public.bloomy_states (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

revoke execute on function public.handle_new_user() from public;
revoke execute on function public.handle_new_user() from anon;
revoke execute on function public.handle_new_user() from authenticated;

alter table profiles enable row level security;
alter table journal_entries enable row level security;
alter table entry_moodlets enable row level security;
alter table bloomy_states enable row level security;
alter table local_imports enable row level security;

create policy "Users can read their profile"
  on profiles for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert their profile"
  on profiles for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their profile"
  on profiles for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their profile"
  on profiles for delete
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can read their journal entries"
  on journal_entries for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert their journal entries"
  on journal_entries for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their journal entries"
  on journal_entries for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their journal entries"
  on journal_entries for delete
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can read their entry moodlets"
  on entry_moodlets for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert their entry moodlets"
  on entry_moodlets for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their entry moodlets"
  on entry_moodlets for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their entry moodlets"
  on entry_moodlets for delete
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can read their Bloomy state"
  on bloomy_states for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert their Bloomy state"
  on bloomy_states for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their Bloomy state"
  on bloomy_states for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their Bloomy state"
  on bloomy_states for delete
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can read their local imports"
  on local_imports for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert their local imports"
  on local_imports for insert
  to authenticated
  with check ((select auth.uid()) = user_id);
