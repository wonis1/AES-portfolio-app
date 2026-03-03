import { supabase } from "./supabase";

export type ProjectListItem = { // 프로젝트 리스트 export 타입설정
  id: number;
  slug: string;
  title: string;
  icon: string;
  intro: string;
  descriptions: string[];
  memberCount: string;
  serviceLink: string;
  startDate: string;
  endDate: string;
  techStack: string[];
};

type ProjectRow = { // 프로젝트 카드에 들어갈 데이터의 타입 설정
  id: number;
  slug: string | null;
  title: string;
  start_date: string | null;
  end_date: string | null;
  service_link: string | null;
  icon_url: string | null;
  member_count: string | null;
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
      icon_url,
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
      icon: row.icon_url ?? "",
      intro: summaryList[0] ?? "",
      descriptions: summaryList,
      memberCount: row.member_count ?? "",
      serviceLink: row.service_link ?? "",
      startDate: normalizeDate(row.start_date),
      endDate: normalizeDate(row.end_date),
      techStack,
    };
  });
};
