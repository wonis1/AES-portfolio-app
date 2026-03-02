import { supabase } from "./supabase";

export type CommentItem = {
  id: number;
  projectId: number;
  nickname: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type CommentRow = {
  id: number;
  project_id: number;
  user_nickname: string;
  content: string;
  created_at: string;
  updated_at: string;
};

type CommentPayload = {
  projectId: number;
  nickname: string;
  content: string;
};

type UpdateCommentPayload = {
  id: number;
  nickname: string;
  content: string;
};

const mapCommentRow = (row: CommentRow): CommentItem => ({
  id: row.id,
  projectId: row.project_id,
  nickname: row.user_nickname,
  content: row.content,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const getCommentsByProjectId = async (projectId: number): Promise<CommentItem[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select("id, project_id, user_nickname, content, created_at, updated_at")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as CommentRow[];
  return rows.map(mapCommentRow);
};

export const createComment = async (payload: CommentPayload): Promise<CommentItem> => {
  const { data, error } = await supabase
    .from("comments")
    .insert({
      project_id: payload.projectId,
      user_nickname: payload.nickname,
      content: payload.content,
    })
    .select("id, project_id, user_nickname, content, created_at, updated_at")
    .single();

  if (error) {
    throw error;
  }

  return mapCommentRow(data as CommentRow);
};

export const updateComment = async (payload: UpdateCommentPayload): Promise<CommentItem> => {
  const { data, error } = await supabase
    .from("comments")
    .update({
      user_nickname: payload.nickname,
      content: payload.content,
    })
    .eq("id", payload.id)
    .select("id, project_id, user_nickname, content, created_at, updated_at")
    .single();

  if (error) {
    throw error;
  }

  return mapCommentRow(data as CommentRow);
};

export const deleteComment = async (commentId: number): Promise<void> => {
  const { error } = await supabase.from("comments").delete().eq("id", commentId);

  if (error) {
    throw error;
  }
};
