import styles from "../styles/AboutInfo.module.css";

type Props = {
  icon?: string;
  title: string;
  content: string;
  href?: string;
};

const AboutInfo = ({ icon, title, content, href }: Props) => {
  const imageStyle = icon ? { backgroundImage: `url(${icon})` } : undefined;

  return (
    <div className={styles.infoWrap}>
      <div className={styles.img} style={imageStyle} />
      <div className={styles.field}>
        <span className={styles.label}>{title}</span>
        {href ? (
          <a className={styles.valueLink} href={href} target="_blank" rel="noreferrer">
            {content}
          </a>
        ) : (
          <p className={styles.value}>{content}</p>
        )}
      </div>
    </div>
  );
};

export default AboutInfo;
