import { supabase } from "./supabase";

export type ProjectDetail = {
  id: number;
  title: string;
  slug: string;
  markdown: string;
};

type ProjectDetailRow = {
  id: number;
  title: string;
  slug: string;
};

const markdownModules = import.meta.glob("../assets/md/*.md", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

const getMarkdownLoaderBySlug = (slug: string): (() => Promise<string>) | undefined => {
  const normalizedSlug = slug.trim().toLowerCase();
  return markdownModules[`../assets/md/${normalizedSlug}.md`];
};

export const getProjectDetailBySlug = async (slug: string): Promise<ProjectDetail> => {
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, slug")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  const row = data as ProjectDetailRow | null;

  if (!row) {
    throw new Error("PROJECT_NOT_FOUND");
  }

  const markdownLoader = getMarkdownLoaderBySlug(row.slug);

  if (!markdownLoader) {
    throw new Error("MARKDOWN_NOT_FOUND");
  }

  const markdown = await markdownLoader();

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    markdown,
  };
};
