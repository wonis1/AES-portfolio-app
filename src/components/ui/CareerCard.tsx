import styles from "../styles/CareerCard.module.css";

type CareerWork = {
  title: string;
  startDate?: string;
  endDate?: string;
  detail: string;
};

export type CareerItem = {
  logoUrl?: string;
  company: string;
  startDate: string;
  endDate?: string;
  intro: string;
  works: CareerWork[];
};


const CareerCard = ({ logoUrl, company, startDate, endDate, intro, works }: CareerItem) => {
  return (
    <article className={styles.card}>
      <div className={styles.logoCol}>
        <div className={styles.logoCircle}>
          { logoUrl ? <img className={styles.logoImage} src={logoUrl}/> : undefined}
        </div>
      </div>
      <div className={styles.detailCol}>
        <h3 className={styles.company}>{company}</h3>
        <p className={styles.period}>{startDate && endDate ? `${startDate} ~ ${endDate}` : undefined}</p>
        <p className={styles.intro}>{intro}</p>
        <ul className={styles.workList}>
          {works.map((work) => (
            <li key={work.title} className={styles.workItem}>
              <strong className={styles.workTitle}>{work.title}</strong>
              <p className={styles.workWhen}>{work.startDate && work.endDate ? `${work.startDate} ~ ${work.endDate}` : undefined}</p>
              <p className={styles.workDetail}>{work.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default CareerCard;
