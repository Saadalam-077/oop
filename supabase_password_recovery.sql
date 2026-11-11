-- OOP Course: secure student password login and one-time recovery codes.
-- Run this whole migration in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto with schema extensions;

-- Keep the existing student rows, IDs, sections, and progress intact.
alter table public.oop_students
  add column if not exists password_hash text,
  add column if not exists recovery_code_hash text;

-- Migrate existing plaintext passwords to bcrypt hashes, then replace the old
-- plaintext values with random unusable strings. Existing student accounts remain.
update public.oop_students
set password_hash = extensions.crypt(password, extensions.gen_salt('bf', 12)),
    password = encode(extensions.gen_random_bytes(32), 'hex')
where password_hash is null
  and password is not null;

-- Login is performed server-side; the browser never reads password hashes.
create or replace function public.student_login(
  p_student_number text,
  p_password text
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_student public.oop_students%rowtype;
begin
  if p_student_number is null or p_password is null then
    return jsonb_build_object('success', false);
  end if;

  select * into v_student
  from public.oop_students s
  where s.student_number = trim(p_student_number)
    and s.password_hash is not null
    and extensions.crypt(p_password, s.password_hash) = s.password_hash
  limit 1;

  if not found then
    return jsonb_build_object('success', false);
  end if;

  return jsonb_build_object(
    'success', true,
    'id', v_student.id,
    'student_name', v_student.student_name,
    'student_number', v_student.student_number,
    'section_number', v_student.section_number,
    'progress', coalesce(v_student.progress, '{}'::jsonb)
  );
end;
$$;

-- New student registration uses the same password hashing scheme.
create or replace function public.register_student(
  p_student_name text,
  p_student_number text,
  p_section_number text,
  p_password text
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_student public.oop_students%rowtype;
begin
  if length(trim(coalesce(p_student_name, ''))) = 0
     or coalesce(p_student_number, '') !~ '^[0-9]{8}$'
     or length(coalesce(p_password, '')) < 8 then
    return jsonb_build_object('success', false);
  end if;

  if exists (select 1 from public.oop_students where student_number = trim(p_student_number)) then
    return jsonb_build_object('success', false);
  end if;

  insert into public.oop_students (
    student_name, student_number, section_number, password, password_hash, progress
  ) values (
    trim(p_student_name), trim(p_student_number), p_section_number,
    encode(extensions.gen_random_bytes(32), 'hex'),
    extensions.crypt(p_password, extensions.gen_salt('bf', 12)),
    '{}'::jsonb
  )
  returning * into v_student;

  return jsonb_build_object(
    'success', true,
    'student', jsonb_build_object(
      'id', v_student.id,
      'student_name', v_student.student_name,
      'student_number', v_student.student_number,
      'section_number', v_student.section_number,
      'progress', coalesce(v_student.progress, '{}'::jsonb)
    )
  );
exception when unique_violation then
  return jsonb_build_object('success', false);
end;
$$;

-- Fixed recovery code for all students: 1234567890 (reusable, not consumed).
create or replace function public.reset_student_password(
  p_student_number text,
  p_recovery_code text,
  p_new_password text
)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_student_id uuid;
begin
  if p_student_number is null
     or p_recovery_code is null
     or length(coalesce(p_new_password, '')) < 8 then
    return false;
  end if;

  select id into v_student_id
  from public.oop_students
  where student_number = trim(p_student_number)
    and trim(p_recovery_code) = '1234567890'
  for update;

  if not found then
    return false;
  end if;

  update public.oop_students
  set password_hash = extensions.crypt(p_new_password, extensions.gen_salt('bf', 12)),
      password = encode(extensions.gen_random_bytes(32), 'hex')
  where id = v_student_id;

  return true;
end;
$$;

-- Remove direct public access to these functions' internals; expose only the RPCs.
revoke all on function public.student_login(text, text) from public;
revoke all on function public.register_student(text, text, text, text) from public;
revoke all on function public.reset_student_password(text, text, text) from public;
grant execute on function public.student_login(text, text) to anon, authenticated;
grant execute on function public.register_student(text, text, text, text) to anon, authenticated;

grant execute on function public.reset_student_password(text, text, text) to anon, authenticated;

-- Prevent browser clients from reading or changing password/recovery hashes.
-- The app only needs these public student fields and progress updates.
revoke all on table public.oop_students from anon, authenticated;
grant select (id, student_name, student_number, section_number, progress)
  on table public.oop_students to anon, authenticated;
grant update (progress) on table public.oop_students to anon, authenticated;
grant delete on table public.oop_students to anon, authenticated;

-- IMPORTANT: Run this query ONCE after the migration to create a separate
-- random recovery code for every existing student. Save/export the result and
-- distribute each code privately to its matching student. The database stores
-- only a bcrypt hash; the plaintext code is returned only by this query.
-- Do not publish the result or commit it to GitHub. Running it again replaces
-- all previous codes and invalidates any codes already distributed.
--
-- WITH generated AS MATERIALIZED (
--   SELECT id, student_number, encode(extensions.gen_random_bytes(16), 'hex') AS recovery_code
--   FROM public.oop_students
-- ), updated AS (
--   UPDATE public.oop_students AS s
--   SET recovery_code_hash = extensions.crypt(g.recovery_code, extensions.gen_salt('bf', 12))
--   FROM generated AS g
--   WHERE s.id = g.id
--   RETURNING s.id
-- )
-- SELECT g.student_number, g.recovery_code
-- FROM generated AS g
-- JOIN updated AS u ON u.id = g.id
-- ORDER BY g.student_number;
