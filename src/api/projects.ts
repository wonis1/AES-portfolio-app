import { supabase } from "./supabase";

export type ProjectListItem = {
  id: number;
  slug: string;
  title: string;
  intro: string;
  descriptions: string[];
  memberCount: number;
  serviceLink: string;
  startDate: string;
  endDate: string;
  techStack: string[];
};

type ProjectRow = {
  id: number;
  slug: string | null;
  title: string;
  start_date: string | null;
  end_date: string | null;
  service_link: string | null;
  member_count: number | null;
  project_details: Array<{ summary: string | null }> | null;
  project_skills: Array<{ skills: Array<{ name: string | null }> | null }> | null;
};

const normalizeDate = (value: string | null): string => value ?? "";

export const getProjects = async (): Promise<ProjectListItem[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      id,
      slug,
      title,
      start_date,
      end_date,
      service_link,
      member_count,
      project_details (
        summary
      ),
      project_skills (
        skills (
          name
        )
      )
    `
    )
    .order("start_date", { ascending: false });

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as ProjectRow[];

  return rows.map((row) => {
    const summaryList = (row.project_details ?? [])
      .map((detail) => detail.summary ?? "")
      .filter((summary) => summary.length > 0);

    const techStack = (row.project_skills ?? [])
      .flatMap((link) => link.skills ?? [])
      .map((skill) => skill.name ?? "")
      .filter((name) => name.length > 0);

    return {
      id: row.id,
      slug: row.slug ?? "",
      title: row.title,
      intro: summaryList[0] ?? "",
      descriptions: summaryList,
      memberCount: row.member_count ?? 0,
      serviceLink: row.service_link ?? "",
      startDate: normalizeDate(row.start_date),
      endDate: normalizeDate(row.end_date),
      techStack,
    };
  });
};
