-- Plak dit in Supabase, bij SQL Editor, en klik op Run.
create table if not exists docs (
  path text primary key,
  coll text not null,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
create index if not exists docs_coll_idx on docs (coll);
alter table docs replica identity full;
alter table docs enable row level security;

create policy "ingelogd leest" on docs for select to authenticated using (true);
create policy "ingelogd maakt aan" on docs for insert to authenticated with check (true);
create policy "ingelogd wijzigt" on docs for update to authenticated using (true) with check (true);
create policy "ingelogd verwijdert" on docs for delete to authenticated using (true);

alter publication supabase_realtime add table docs;
