import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import styles from "./styles/ProjectDetail.module.css";
import { getProjectDetailBySlug } from "../../api/projectDetails";
import NotFound from "../notFound/NotFound";

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const {
    data: projectDetail,
    isPending,
    error,
  } = useQuery({
    queryKey: ["project-detail", slug],
    queryFn: () => getProjectDetailBySlug(slug ?? ""),
    enabled: Boolean(slug),
  });

  if (!slug || error) {
    return <NotFound />;
  }

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
          <h2 className={styles.sectionLabel}>md 파일</h2>
          <article className={styles.mdPanel}>
            <div className={styles.mdHeader}>
              <h3 className={styles.mdTitle}>{projectDetail?.title ?? "프로젝트 문서"}</h3>
            </div>
            <div className={styles.mdBody}>
              {isPending && <p>마크다운 파일을 불러오는 중입니다.</p>}
              {!isPending && projectDetail && <ReactMarkdown>{projectDetail.markdown}</ReactMarkdown>}
            </div>
          </article>

          <h2 className={styles.commentTitle}>댓글</h2>
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
