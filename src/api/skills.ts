import { supabase } from "./supabase";

export type SkillCategory = "BACKEND" | "FRONTEND" | "DEV_OPS" | "LANGUAGE";

export type SkillListItem = {
  id: number;
  name: string;
  category: SkillCategory;
  bgColor: string;
  textColor: string;
  show: boolean;
};

type SkillRow = {
  id: number;
  name: string;
  category: SkillCategory;
  bg_color: string | null;
  text_color: string | null;
  show: boolean;
};

export const getSkills = async (): Promise<SkillListItem[]> => {
  const { data, error } = await supabase
    .from("skills")
    .select(
      `
      id,
      name,
      category,
      bg_color,
      text_color,
      show
    `
    )
    .order("category", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as SkillRow[];

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    category: row.category,
    bgColor: row.bg_color ?? "",
    textColor: row.text_color ?? "",
    show: row.show ?? false
  }));
};
