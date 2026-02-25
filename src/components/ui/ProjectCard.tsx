import styles from "../styles/ProjectCard.module.css";

type Props = {
    icon?: string;
    title: string;
    startDate?: string;
    endDate?: string;
    serviceLink?: string;
    memberCount?: number;
    techStack?: string[];

};

const ProjectCard = ({
    icon,
    title,
    startDate,
    endDate,
    serviceLink,
    memberCount,
    techStack = [],
}: Props) => {
    return (
        <div className={styles.projectCard}>
            <div className={styles.header}>
                {icon ? (<img src={icon} alt="project icon" className={styles.icon} />) : (<div className={styles.icon} />)}
                <div className={styles.icon} />
                {memberCount !== undefined && (
                    <div className={styles.memberTag}>
                        {memberCount}인 프로젝트
                    </div>)}
            </div>

            <h2 className={styles.title}>{title}</h2>

            {serviceLink && (
                <a href={serviceLink}
                    target="_blank"
                    className={styles.link}>
                    서비스 페이지
                </a>
            )}

            <div className={styles.divider} />

            <div className={styles.techSection}>
                <h3>기술 스택</h3>
                <div className={styles.techList}>
                    {techStack.map((tech, i) => (
                        <span key={`${tech} - ${i}`} className={styles.techItem}>
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {(startDate || endDate) && (
                <div className={styles.date}>
                    {startDate ?? ""} {startDate && endDate && " ~ "} {endDate ?? ""}
                </div>
            )}
        </div>
    );
};

export default ProjectCard;