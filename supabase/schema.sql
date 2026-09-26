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
   image_url  text,
   author     text,
   category   text,
   created_at timestamp with time zone default now()
);

-- If the table already exists, add missing columns safely
alter table public.blog_posts add column if not exists image_url text;
alter table public.blog_posts add column if not exists author text;
alter table public.blog_posts add column if not exists category text;

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
   photo_url  text,
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

-- ==========================================================
-- Homepage and About CMS content
-- Run this section after the base schema above.
-- ==========================================================
create table if not exists public.faqs (
  id bigserial primary key,
  question text not null,
  answer text not null,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.testimonials (
  id bigserial primary key,
  name text not null,
  role text,
  content text not null,
  avatar_url text,
  rating integer default 5 check (rating between 1 and 5),
  created_at timestamptz default now()
);

create table if not exists public.partners (
  id bigserial primary key,
  name text not null,
  type text,
  description text,
  logo_url text,
  url text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.about_sections (
  id bigserial primary key,
  section_key text unique not null,
  title text not null,
  content text,
  image_url text,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Required columns used by the live public pages.
alter table public.team_members add column if not exists department text;
alter table public.team_members add column if not exists image_url text;
alter table public.events add column if not exists type text;
alter table public.events add column if not exists image_url text;
alter table public.courses add column if not exists image_url text;

-- Enable RLS for the new CMS tables.
alter table public.faqs enable row level security;
alter table public.testimonials enable row level security;
alter table public.partners enable row level security;
alter table public.about_sections enable row level security;

-- Public visitors can read published CMS content.
drop policy if exists "Public read faqs" on public.faqs;
create policy "Public read faqs" on public.faqs for select to anon, authenticated using (true);
drop policy if exists "Public read testimonials" on public.testimonials;
create policy "Public read testimonials" on public.testimonials for select to anon, authenticated using (true);
drop policy if exists "Public read partners" on public.partners;
create policy "Public read partners" on public.partners for select to anon, authenticated using (true);
drop policy if exists "Public read about sections" on public.about_sections;
create policy "Public read about sections" on public.about_sections for select to anon, authenticated using (true);

-- Only authenticated admin/moderator users can manage CMS content.
drop policy if exists "Staff manage faqs" on public.faqs;
create policy "Staff manage faqs" on public.faqs for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'moderator')) with check ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'moderator'));
drop policy if exists "Staff manage testimonials" on public.testimonials;
create policy "Staff manage testimonials" on public.testimonials for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'moderator')) with check ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'moderator'));
drop policy if exists "Staff manage partners" on public.partners;
create policy "Staff manage partners" on public.partners for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'moderator')) with check ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'moderator'));
drop policy if exists "Staff manage about sections" on public.about_sections;
create policy "Staff manage about sections" on public.about_sections for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'moderator')) with check ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'moderator'));

-- Storage buckets used by the app. Keep profile uploads private; public
-- content images can be read through their public URL when the bucket is public.
insert into storage.buckets (id, name, public) values ('admin-profiles', 'admin-profiles', false) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('content-images', 'content-images', true) on conflict (id) do nothing;
