import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import styles from "./styles/ProjectDetail.module.css";
import { getProjectDetailBySlug } from "../../api/projectDetails";
import { createComment, deleteComment, getCommentsByProjectId, updateComment } from "../../api/comments";
import NotFound from "../notFound/NotFound";

const formatDateTime = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

const ProjectDetail = () => {
  const navigate = useNavigate();
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
          <article className={styles.mdPanel}>

            <div className={styles.mdHeader}>

              <h3 className={styles.mdTitle}>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={() => navigate(-1)}
                  aria-label="이전 페이지로 이동">
                  ←
                </button>
                {projectDetail?.title ?? "프로젝트 문서"}
              </h3>
            </div>
            <div className={styles.mdBody}>
              {isPending && <p>마크다운 문서를 불러오는 중입니다.</p>}
              {!isPending && projectDetail && <ReactMarkdown>{projectDetail.markdown}</ReactMarkdown>}
            </div>
          </article>

          <section className={styles.commentPanel}>
            <div className={styles.commentMeta}>
              <span>댓글 {comments.length}개</span>
            </div>

            {isCommentsPending && <p className={styles.commentEmpty}>댓글을 불러오는 중입니다.</p>}
            {!isCommentsPending && comments.length === 0 && (
              <p className={styles.commentEmpty}>아직 작성된 댓글이 없습니다.</p>
            )}
            {!isCommentsPending && comments.length > 0 && (
              <ul className={styles.commentList}>
                {comments.map((comment) => (
                  <li key={comment.id} className={styles.commentItem}>
                    <div className={styles.commentItemHeader}>
                      <span className={styles.commentAuthor}>{comment.nickname}</span>
                      <span className={styles.commentTime}>{formatDateTime(comment.createdAt)}</span>
                    </div>
                    <p className={styles.commentText}>{comment.content}</p>
                    <div className={styles.commentActions}>
                      <button
                        type="button"
                        className={styles.actionButton}
                        disabled={isMutating}
                        onClick={() => handleClickEdit(comment.id, comment.nickname, comment.content)}
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        className={styles.actionButton}
                        disabled={isMutating}
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {commentsError && <p className={styles.commentError}>댓글 목록을 불러오지 못했습니다.</p>}
            {mutationError && <p className={styles.commentError}>댓글 작업 중 오류가 발생했습니다.</p>}

            <div className={styles.commentForm}>
              <label className={styles.fieldLabel} htmlFor="comment-nickname">
                닉네임
              </label>
              <input
                id="comment-nickname"
                className={styles.nicknameInput}
                placeholder="닉네임을 입력해주세요."
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
              />

              <label className={styles.fieldLabel} htmlFor="comment-content">
                댓글 내용
              </label>
              <textarea
                id="comment-content"
                className={styles.commentInput}
                placeholder="댓글 내용을 작성해주세요."
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.submitButton}
                  disabled={isMutating}
                  onClick={handleSubmitComment}
                >
                  {activeSubmitLabel}
                </button>
                {editingCommentId && (
                  <button
                    type="button"
                    className={styles.cancelButton}
                    disabled={isMutating}
                    onClick={handleCancelEdit}
                  >
                    수정 취소
                  </button>
                )}
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
};

export default ProjectDetail;
