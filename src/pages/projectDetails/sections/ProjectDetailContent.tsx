import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import styles from "../styles/ProjectDetail.module.css";

type ProjectDetailContentProps = {
  title?: string;
  markdown?: string;
  isPending: boolean;
};

const ProjectDetailContent = ({ title, markdown, isPending }: ProjectDetailContentProps) => {
  const navigate = useNavigate();

  return (
    <article className={styles.mdPanel}>
      <div className={styles.mdHeader}>
        <h3 className={styles.mdTitle}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate(-1)}
            aria-label="이전 페이지로 이동"
          >
            ←
          </button>
          {title ?? "프로젝트 문서"}
        </h3>
      </div>
      <div className={styles.mdBody}>
        {isPending && <p>마크다운 문서를 불러오는 중입니다.</p>}
        {!isPending && markdown && <ReactMarkdown>{markdown}</ReactMarkdown>}
      </div>
    </article>
  );
};

export default ProjectDetailContent;
