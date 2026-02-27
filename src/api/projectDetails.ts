import { supabase } from "./supabase";

export type ProjectDetail = {
  title: string;
  slug: string;
  markdown: string;
};

type ProjectDetailRow = {
  title: string;
  slug: string;
  md_url: string | null;
};

export const getProjectDetailBySlug = async (slug: string): Promise<ProjectDetail> => {
  const { data, error } = await supabase
    .from("projects")
    .select("title, slug, md_url")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  const row = data as ProjectDetailRow | null;

  if (!row || !row.md_url) {
    throw new Error("PROJECT_NOT_FOUND");
  }

  const mdResponse = await fetch(row.md_url);

  if (!mdResponse.ok) {
    throw new Error("MARKDOWN_FETCH_FAILED");
  }

  const markdown = await mdResponse.text();

  return {
    title: row.title,
    slug: row.slug,
    markdown,
  };
};
