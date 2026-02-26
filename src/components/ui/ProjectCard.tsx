import styles from "../styles/ProjectCard.module.css";

type Props = {
  icon?: string;
  title: string;
  intro?: string;
  descriptions?: string[];
  highlighted?: boolean;
  startDate?: string;
  endDate?: string;
  serviceLink?: string;
  memberCount?: number;
  techStack?: string[];
};

const ProjectCard = ({
  icon,
  title,
  intro,
  descriptions = [],
  startDate,
  endDate,
  serviceLink,
  memberCount,
  techStack = [],
}: Props) => {
  return (
    <article className={styles.projectCard}>
      <div className={styles.header}>
        {icon ? (
          <img src={icon} alt="project icon" className={styles.icon} />
        ) : (
          <div className={styles.iconPlaceholder}>프로젝트 아이콘</div>
        )}
        {memberCount !== undefined && (
          <div className={styles.memberTag}>{memberCount}인 프로젝트</div>
        )}
      </div>

      <h2 className={styles.title}>{title}</h2>

      {serviceLink && (
        <a href={serviceLink} target="_blank" rel="noreferrer" className={styles.link}>
          프로젝트에 연결된 실제링크
        </a>
      )}

      <div className={styles.divider} />

      <section className={styles.introSection}>
        <h3 className={styles.sectionHeading}>
          프로젝트 한줄 소개 {intro && <span className={styles.sectionSubText}>({intro})</span>}
        </h3>
        {descriptions.length > 0 && (
          <ul className={styles.descriptionList}>
            {descriptions.map((description, index) => (
              <li key={`${description}-${index}`} className={styles.descriptionItem}>
                {description}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.techSection}>
        <h3 className={styles.techTitle}>기술 스택</h3>
        <div className={styles.techDivider} />
        <div className={styles.techList}>
          {techStack.map((tech, index) => (
            <span key={`${tech}-${index}`} className={styles.techItem}>
              {tech}
            </span>
          ))}
        </div>
      </section>

      {(startDate || endDate) && (
        <div className={styles.date}>
          {startDate ?? ""}
          {startDate && endDate && " ~ "}
          {endDate ?? ""}
        </div>
      )}
    </article>
  );
};

export default ProjectCard;
