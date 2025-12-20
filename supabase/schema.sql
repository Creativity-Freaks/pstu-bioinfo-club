-- Supabase schema for pstu-bioinfo-club
-- Run this in your Supabase SQL editor

create table if not exists public.courses (
   id          bigserial primary key,
   title       text not null,
   description text,
   duration    text,
   level       text,
   modules     integer,
   created_at  timestamp with time zone default now()
);

create table if not exists public.events (
   id          bigserial primary key,
   title       text not null,
   description text,
   date        text,
   location    text,
   created_at  timestamp with time zone default now()
);

create table if not exists public.team_members (
   id         bigserial primary key,
   name       text not null,
   role       text,
   bio        text,
   avatar_url text,
   created_at timestamp with time zone default now()
);

create table if not exists public.gallery_items (
   id         bigserial primary key,
   title      text,
   image_url  text,
   caption    text,
   created_at timestamp with time zone default now()
);

create table if not exists public.blog_posts (
   id         bigserial primary key,
   title      text not null,
   slug       text unique,
   excerpt    text,
   content    text,
   created_at timestamp with time zone default now()
);

-- Contact messages
create table if not exists public.contact_messages (
   id         bigserial primary key,
   name       text not null,
   email      text not null,
   student_id text,
   message    text not null,
   created_at timestamp with time zone default now()
);

-- Membership applications
create table if not exists public.memberships (
   id         bigserial primary key,
   name       text not null,
   email      text not null,
   student_id text not null,
   department text,
   year       text,
   phone      text,
   bio        text,
   skills     text,
   created_at timestamp with time zone default now()
);

-- RLS toggle (commented here to avoid SQL lint issues). To disable RLS in Supabase, run in SQL Editor:
-- ALTER TABLE public.courses        DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.events         DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.team_members   DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.gallery_items  DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.blog_posts     DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.memberships    DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.contact_messages DISABLE ROW LEVEL SECURITY;

-- Public read access policies (commented out)
-- create policy if not exists "Public read courses" on public.courses for select using (true);
-- create policy if not exists "Public read events" on public.events for select using (true);
-- create policy if not exists "Public read team" on public.team_members for select using (true);
-- create policy if not exists "Public read gallery" on public.gallery_items for select using (true);
-- create policy if not exists "Public read blog" on public.blog_posts for select using (true);
-- No public read for memberships (sensitive). Only allow inserts from anon and updates for authenticated.
-- create policy if not exists "Anon can apply membership" on public.memberships for insert with check (true);

-- Allow anonymous inserts for contact messages; reading is restricted (commented, enable as needed)
-- create policy if not exists "Anon can create contact messages" on public.contact_messages for insert with check (true);

-- Tighten access: limit memberships read/update to the club admin email only (commented out)
-- drop policy if exists "Authenticated read memberships" on public.memberships;
-- drop policy if exists "Authenticated update memberships" on public.memberships;

-- Replace with admin-only policies; adjust email as needed (commented out)
-- create policy if not exists "Admin email read memberships" on public.memberships
--   for select using ((auth.jwt() ->> 'email') = 'bioinformaticsclubpstu@gmail.com');

-- create policy if not exists "Admin email update memberships" on public.memberships
--   for update using ((auth.jwt() ->> 'email') = 'bioinformaticsclubpstu@gmail.com');

-- Optional: allow delete by admin email (uncomment if desired)
-- create policy if not exists "Admin email delete memberships" on public.memberships
--   for delete using ((auth.jwt() ->> 'email') = 'bioinformaticsclubpstu@gmail.com');

-- Authenticated write access (commented out)
-- create policy if not exists "Authenticated write courses" on public.courses for insert with check (auth.role() = 'authenticated');
-- create policy if not exists "Authenticated write courses upd" on public.courses for update using (auth.role() = 'authenticated');

-- create policy if not exists "Authenticated write events" on public.events for insert with check (auth.role() = 'authenticated');
-- create policy if not exists "Authenticated write events upd" on public.events for update using (auth.role() = 'authenticated');

-- create policy if not exists "Authenticated write team" on public.team_members for insert with check (auth.role() = 'authenticated');
-- create policy if not exists "Authenticated write team upd" on public.team_members for update using (auth.role() = 'authenticated');

-- create policy if not exists "Authenticated write gallery" on public.gallery_items for insert with check (auth.role() = 'authenticated');
-- create policy if not exists "Authenticated write gallery upd" on public.gallery_items for update using (auth.role() = 'authenticated');

-- create policy if not exists "Authenticated write blog" on public.blog_posts for insert with check (auth.role() = 'authenticated');
-- create policy if not exists "Authenticated write blog upd" on public.blog_posts for update using (auth.role() = 'authenticated');

-- ==========================================================
-- RLS policies (enabled): allow required operations safely
-- ==========================================================

-- Public read access for site content
-- (Skipped per preference: no policies)

-- Allow anonymous inserts for contact messages (frontend uses anon key)
-- (Skipped per preference: no policies)

-- Allow anonymous inserts for memberships (join form)
-- (Skipped per preference: no policies)

-- Allow anonymous inserts for gallery items (admin UI without auth)
-- (Skipped per preference: no policies)

-- ----------------------------------------------------------
-- Supabase Storage policies for 'gallery' bucket
-- ----------------------------------------------------------
-- Public can read objects from the 'gallery' bucket
-- (Storage policies skipped; use server-side or UI toggle if needed)

-- ==========================================================
-- Alternative: disable RLS on selected tables (no policies)
-- ==========================================================
-- Run these in Supabase SQL Editor to allow inserts/selects
ALTER TABLE public.memberships DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts DISABLE ROW LEVEL SECURITY;

-- Note: Storage doesn't support DISABLE RLS per bucket. If you want
-- public image access without policies, use server-side proxy for uploads
-- and downloads, or toggle bucket to "Public" in the UI (which creates policies).
