# Project Onboarding Guide

This guide defines the minimum steps to add a new portfolio project.

## 1) Add Markdown file

1. Add a file under `src/assets/md`.
2. File name must match the project slug exactly.

Example:
- File: `src/assets/md/my-new-project.md`
- Slug: `my-new-project`

## 2) Insert into `projects`

`id` is identity, so do not insert `id` manually.

```sql
insert into public.projects (
  title,
  slug,
  start_date,
  end_date,
  service_link,
  member_count,
  md_url
) values (
  'My New Project',
  'my-new-project',
  date '2025-02-24',
  date '2025-03-01',
  null,
  1,
  null
);
```

## 3) Insert card description lines into `project_details`

Recommended: 2 to 5 summary lines.

```sql
insert into public.project_details (project_id, summary)
select p.id, s.summary
from public.projects p
join (
  values
    ('my-new-project', 'Key summary line 1'),
    ('my-new-project', 'Key summary line 2'),
    ('my-new-project', 'Key summary line 3')
) as s(slug, summary)
  on p.slug = s.slug;
```

## 4) Add skills and map to project

If a skill does not exist, upsert it first, then map it.

```sql
insert into public.skills (name, "category", bg_color, text_color, show)
values ('MySkill', 'BACKEND'::public.category_enum, '#EEF2FF', '#1D4ED8', true)
on conflict (name) do update
set "category" = excluded."category",
    bg_color = excluded.bg_color,
    text_color = excluded.text_color,
    show = excluded.show,
    updated_at = now();
```

```sql
insert into public.project_skills (project_id, skill_id)
select p.id, s.id
from public.projects p
join public.skills s on s.name in ('React', 'MySkill')
where p.slug = 'my-new-project'
on conflict (project_id, skill_id) do update
set updated_at = now();
```

## 5) Verify comment CRUD on detail page

Check all actions:

1. Create comment
2. Update comment
3. Delete comment
4. Reload page and verify persistence

## 6) Validation SQL

```sql
select id, slug, title
from public.projects
where slug = 'my-new-project';
```

```sql
select p.slug, count(d.id) as detail_count
from public.projects p
left join public.project_details d on d.project_id = p.id
where p.slug = 'my-new-project'
group by p.slug;
```

```sql
select p.slug, count(ps.skill_id) as skill_count
from public.projects p
left join public.project_skills ps on ps.project_id = p.id
where p.slug = 'my-new-project'
group by p.slug;
```
