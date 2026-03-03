import styles from "../styles/ProjectDetail.module.css";
import type { CommentItem } from "../../../api/comments";

type CommentSectionProps = {
  comments: CommentItem[];
  nickname: string;
  content: string;
  editingCommentId: number | null;
  isCommentsPending: boolean;
  isMutating: boolean;
  activeSubmitLabel: string;
  hasCommentsError: boolean;
  hasMutationError: boolean;
  onNicknameChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: () => Promise<void>;
  onStartEdit: (commentId: number, commentNickname: string, commentContent: string) => void;
  onCancelEdit: () => void;
  onDelete: (commentId: number) => Promise<void>;
};

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

const Comment = ({
  comments,
  nickname,
  content,
  editingCommentId,
  isCommentsPending,
  isMutating,
  activeSubmitLabel,
  hasCommentsError,
  hasMutationError,
  onNicknameChange,
  onContentChange,
  onSubmit,
  onStartEdit,
  onCancelEdit,
  onDelete,
}: CommentSectionProps) => {
  return (
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
                  onClick={() => onStartEdit(comment.id, comment.nickname, comment.content)}
                >
                  수정
                </button>
                <button
                  type="button"
                  className={styles.actionButton}
                  disabled={isMutating}
                  onClick={() => onDelete(comment.id)}
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {hasCommentsError && <p className={styles.commentError}>댓글 목록을 불러오지 못했습니다.</p>}
      {hasMutationError && <p className={styles.commentError}>댓글 작업 중 오류가 발생했습니다.</p>}

      <div className={styles.commentForm}>
        <label className={styles.fieldLabel} htmlFor="comment-nickname">
          닉네임
        </label>
        <input
          id="comment-nickname"
          className={styles.nicknameInput}
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={(event) => onNicknameChange(event.target.value)}
        />

        <label className={styles.fieldLabel} htmlFor="comment-content">
          댓글 내용
        </label>
        <textarea
          id="comment-content"
          className={styles.commentInput}
          placeholder="댓글 내용을 작성해주세요."
          value={content}
          onChange={(event) => onContentChange(event.target.value)}
        />

        <div className={styles.formActions}>
          <button type="button" className={styles.submitButton} disabled={isMutating} onClick={onSubmit}>
            {activeSubmitLabel}
          </button>
          {editingCommentId && (
            <button
              type="button"
              className={styles.cancelButton}
              disabled={isMutating}
              onClick={onCancelEdit}
            >
              수정 취소
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Comment;
