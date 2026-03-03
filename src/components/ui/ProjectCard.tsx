import styles from "../styles/ProjectCard.module.css";
import { useNavigate } from "react-router-dom";
import type { KeyboardEvent } from "react";

type Props = {
  icon?: string;
  title: string;
  intro?: string;
  descriptions?: string[];
  highlighted?: boolean;
  startDate?: string;
  endDate?: string;
  serviceLink?: string;
  memberCount?: string;
  techStack?: string[];
  skillColorMap?: Record<string, { bgColor: string; textColor: string }>;
  detailPath?: string;
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
  skillColorMap = {},
  detailPath,
}: Props) => {
  const navigate = useNavigate();
  const isClickable = Boolean(detailPath);

  const handleCardClick = () => {
    if (detailPath) {
      navigate(detailPath);
    }
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!isClickable) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article
      className={`${styles.projectCard} ${isClickable ? styles.clickableCard : ""}`}
      onClick={isClickable ? handleCardClick : undefined}
      onKeyDown={handleCardKeyDown}
      role={isClickable ? "link" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `${title} 상세 페이지로 이동` : undefined}
    >
      <div className={styles.header}>
        {icon ? (
          <img src={icon} alt="project icon" className={styles.icon} />
        ) : (
          <div className={styles.iconPlaceholder}>프로젝트 아이콘</div>
        )}
        {memberCount !== undefined && (
          <div className={styles.memberTag}>{memberCount} 프로젝트</div>
        )}
      </div>

      <h2 className={styles.title}>{title}</h2>

      {serviceLink && (
        <a
          href={serviceLink}
          target="_blank"
          rel="noreferrer"
          className={styles.link}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          서비스 페이지 바로가기
        </a>
      )}

      <div className={styles.divider} />

      <section className={styles.introSection}>
        <h3 className={styles.sectionHeading}>
          {intro && <span className={styles.sectionSubText}>({intro})</span>}
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
          {techStack.map((tech, index) => {
            const skillColor = skillColorMap[tech.toLowerCase()];
            const tagStyle = skillColor?.bgColor && skillColor?.textColor
              ? { backgroundColor: skillColor.bgColor, color: skillColor.textColor, borderColor: "rgba(0, 0, 0, 0.2)" }
              : undefined;

            return (
              <span key={`${tech}-${index}`} className={styles.techItem} style={tagStyle}>
                {tech}
              </span>
            );
          })}
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
