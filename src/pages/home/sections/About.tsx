import SectionTitle from "../../../components/ui/SectionTitle";
import AboutInfo from "../../../components/ui/AboutInfo";
import styles from "../styles/About.module.css";
import userIcon from "../../../assets/icons/user-icon.png";
import calendarIcon from "../../../assets/icons/calendar-icon.png";
import mappinIcon from "../../../assets/icons/mappin-icon.png";
import phoneIcon from "../../../assets/icons/phone-icon.png";
import mailIcon from "../../../assets/icons/mail-icon.png";
import penIcon from "../../../assets/icons/pen-icon.png";
import notionIcon from "../../../assets/icons/notion.png";
import githubIcon from "../../../assets/icons/github-icon.png";

const About = () => {
  const aboutInfoList = [
    { icon: userIcon, title: "이름", content: "정재원" },
    { icon: calendarIcon, title: "생년월일", content: "1997.07.28" },
    { icon: mappinIcon, title: "주소", content: "서울특별시 관악구" },
    { icon: phoneIcon, title: "연락처", content: "010-5671-2585" },
    { icon: mailIcon, title: "이메일", content: "wjdwo2808@email.com" },
    { icon: penIcon, title: "학력", content: "OO대학교\n컴퓨터공학과" },
    { icon: githubIcon, title: "GitHub", content: "깃허브주소를넣어라", href: "https://github.com/your-id" },
    { icon: notionIcon, title: "Notion", content: "노션주소를넣어라라라", href: "https://www.notion.so/your-page" },
  ];

  return (
    <div className={styles.about}>
      <section id="about" className={styles.content}>
        <SectionTitle title="ABOUT ME" lineColor="#cccccc" />
        <div className={styles.info}>
          {aboutInfoList.map((item) => (
            <AboutInfo key={item.title} icon={item.icon} title={item.title} content={item.content} href={item.href} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
