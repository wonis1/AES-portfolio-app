import SectionTitle from "../../../components/ui/SectionTitle";
import styles from "../styles/Intro.module.css";

const Intro = () => {
  return (
    <div id="intro" className={styles.intro}>
      <section className={styles.content}>
        <SectionTitle title={"- 정재원 -\n프론트엔드 개발자 포트폴리오"} lineUse={false} iconUse={false} txtUse={true} txtColor="white" />
      </section>
    </div>
  );
};

export default Intro;
