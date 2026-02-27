import { useNavigate } from "react-router-dom";
import styles from "./styles/ProjectDetail.module.css";

const ProjectDetail = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.topBar}>
          <div className={styles.brandRow}>
            <div className={styles.logo}>HYUNDAI AutoEver</div>
            <div className={styles.titleWrap}>
              <h1 className={styles.title}>IT 엘도라도</h1>
              <p className={styles.subtitle}>기록될 때 비로소 빛이 나는 IT 지식의 보물 도시</p>
            </div>
          </div>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate(-1)}
            aria-label="이전 페이지로 이동"
          >
            ←
          </button>
        </header>

        <section className={styles.content}>
          <article className={styles.mdPanel}>
            <div className={styles.mdHeader}>
              <h3 className={styles.mdTitle}>양귀자 | 원미동 사람들 中 &lt;한계령&gt;</h3>
              <span className={styles.categoryTag}>독서</span>
              <p className={styles.mdDate}>2025-01-29 15:14</p>
            </div>
            <div className={styles.mdBody}>여기에 md 파일 내용이 표시될 영역입니다.</div>
          </article>

          <section className={styles.commentPanel}>
            <div className={styles.commentMeta}>
              <span>댓글 0개</span>
              <span>좋아요 17개</span>
            </div>
            <p className={styles.commentEmpty}>아직 작성된 댓글이 없어요</p>
            <div className={styles.nickname}>댓글 닉네임</div>
            <textarea className={styles.commentInput} placeholder="댓글 내용을 작성해주세요." />
          </section>
        </section>
      </div>
    </main>
  );
};

export default ProjectDetail;
