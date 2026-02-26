import styles from "../styles/CareerCard.module.css";

type CareerWork = {
  title: string;
  when?: string;
  detail: string;
};

export type CareerItem = {
  logoSrc?: string;
  company: string;
  period: string;
  slogan: string;
  roles: string[];
  works: CareerWork[];
};

const CareerCard = ({ logoSrc, company, period, slogan, roles, works }: CareerItem) => {
  return (
    <article className={styles.card}>
      <div className={styles.logoCol}>
        <div className={styles.logoCircle}>
          { logoSrc ? <img className={styles.logoImage} src={logoSrc}/> : undefined}
        </div>
      </div>
      <div className={styles.detailCol}>
        <h3 className={styles.company}>{company}</h3>
        <p className={styles.period}>{period}</p>
        <p className={styles.slogan}>{slogan}</p>
        <div className={styles.roleChips}>
          {roles.map((role) => (
            <span key={role} className={styles.roleChip}>
              {role}
            </span>
          ))}
        </div>
        <ul className={styles.workList}>
          {works.map((work) => (
            <li key={work.title} className={styles.workItem}>
              <strong className={styles.workTitle}>{work.title}</strong>
              <p className={styles.workWhen}>{work.when ? work.when : undefined}</p>
              <p className={styles.workDetail}>{work.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default CareerCard;
