import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./styles/ProjectDetail.module.css";
import { getProjectDetailBySlug } from "../../api/projectDetails";
import { createComment, deleteComment, getCommentsByProjectId, updateComment } from "../../api/comments";
import NotFound from "../notFound/NotFound";
import ProjectDetailContent from "./sections/ProjectDetailContent";
import Comment from "./sections/Comment";

const ProjectDetail = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const {
    data: projectDetail,
    isPending,
    error,
  } = useQuery({
    queryKey: ["project-detail", slug],
    queryFn: () => getProjectDetailBySlug(slug ?? ""),
    enabled: Boolean(slug),
  });

  const projectId = projectDetail?.id;

  const {
    data: comments = [],
    isPending: isCommentsPending,
    error: commentsError,
  } = useQuery({
    queryKey: ["project-comments", projectId],
    queryFn: () => getCommentsByProjectId(projectId ?? 0),
    enabled: typeof projectId === "number",
  });

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: async () => {
      setContent("");
      setEditingCommentId(null);
      await queryClient.invalidateQueries({ queryKey: ["project-comments", projectId] });
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: async () => {
      setContent("");
      setEditingCommentId(null);
      await queryClient.invalidateQueries({ queryKey: ["project-comments", projectId] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["project-comments", projectId] });
    },
  });

  const isMutating =
    createCommentMutation.isPending ||
    updateCommentMutation.isPending ||
    deleteCommentMutation.isPending;

  const mutationError =
    createCommentMutation.error ??
    updateCommentMutation.error ??
    deleteCommentMutation.error;

  const activeSubmitLabel = useMemo(() => {
    if (editingCommentId) {
      return updateCommentMutation.isPending ? "수정 중..." : "댓글 수정";
    }

    return createCommentMutation.isPending ? "등록 중..." : "댓글 등록";
  }, [createCommentMutation.isPending, editingCommentId, updateCommentMutation.isPending]);

  const handleSubmitComment = async () => {
    if (!projectId || content.trim().length === 0 || nickname.trim().length === 0) {
      return;
    }

    if (editingCommentId) {
      await updateCommentMutation.mutateAsync({
        id: editingCommentId,
        nickname: nickname.trim(),
        content: content.trim(),
      });
      return;
    }

    await createCommentMutation.mutateAsync({
      projectId,
      nickname: nickname.trim(),
      content: content.trim(),
    });
  };

  const handleClickEdit = (commentId: number, commentNickname: string, commentContent: string) => {
    setEditingCommentId(commentId);
    setNickname(commentNickname);
    setContent(commentContent);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setContent("");
  };

  const handleDeleteComment = async (commentId: number) => {
    await deleteCommentMutation.mutateAsync(commentId);
  };

  if (!slug || error) {
    return <NotFound />;
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.topBar}>
          <div className={styles.brandRow}>
            <Link to="/" className={styles.logoLink}>
              JAEWON&apos;s Portfolio
            </Link>
            <div className={styles.titleWrap}>
              <h1 className={styles.title}>프로젝트 상세</h1>
              <p className={styles.subtitle}>프로젝트 문서와 코멘트를 한 화면에서 확인합니다.</p>
            </div>
          </div>
        </header>

        <section className={styles.content}>
          <ProjectDetailContent
            title={projectDetail?.title}
            markdown={projectDetail?.markdown}
            isPending={isPending}
          />

          <Comment
            comments={comments}
            nickname={nickname}
            content={content}
            editingCommentId={editingCommentId}
            isCommentsPending={isCommentsPending}
            isMutating={isMutating}
            activeSubmitLabel={activeSubmitLabel}
            hasCommentsError={Boolean(commentsError)}
            hasMutationError={Boolean(mutationError)}
            onNicknameChange={setNickname}
            onContentChange={setContent}
            onSubmit={handleSubmitComment}
            onStartEdit={handleClickEdit}
            onCancelEdit={handleCancelEdit}
            onDelete={handleDeleteComment}
          />
        </section>
      </div>
    </main>
  );
};

export default ProjectDetail;
