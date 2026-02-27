import SectionTitle from "../../../components/ui/SectionTitle";
import styles from "../styles/Intro.module.css";

const Intro = () => {
  return (
    <div id="intro" className={styles.intro}>
      <section className={styles.content}>
        <SectionTitle title={"- 정재원 -\n프론트엔드 개발자 포트폴리오"} lineUse={false} iconUse={false} txtUse={true} txtColor="white" />
        <p className={styles.introLine} />
        <p className={styles.introText}>
          안녕하세요.<br/>
          끊임없이 탐구하는 프론트엔드 개발자<br/>
          정재원입니다.
        </p>
      </section>
      <a href="#about" className={styles.scrollHint} aria-label="아래 섹션으로 스크롤">
        <span className={styles.scrollText}>SCROLL</span>
        <span className={styles.scrollIcon}>
          <span className={styles.scrollDot} />
        </span>
      </a>
    </div>
  );
};

export default Intro;
