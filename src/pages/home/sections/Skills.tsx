import { useQuery } from "@tanstack/react-query";
import SkillTag from "../../../components/ui/SkillTag";
import SectionTitle from "../../../components/ui/SectionTitle";
import styles from "../styles/Skills.module.css";
import { getSkills, type SkillCategory } from "../../../api/skills";

import languageIcon from "../../../assets/icons/language-icon.png";
import frontendIcon from "../../../assets/icons/html-icon.png";
import backendIcon from "../../../assets/icons/backend-icon.png";
import devopsIcon from "../../../assets/icons/server-icon.png";

const iconList: Array<{ icon: string; text: string; category: SkillCategory }> = [
  { icon: languageIcon, text: "Language", category: "LANGUAGE" },
  { icon: frontendIcon, text: "Frontend", category: "FRONTEND" },
  { icon: backendIcon, text: "Backend", category: "BACKEND" },
  { icon: devopsIcon, text: "DevOps", category: "DEV_OPS" },
];

const Skills = () => {
  const {
    data: skills = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });

  const skillsByCategory = iconList.reduce<Record<SkillCategory, typeof skills>>((acc, item) => {
    acc[item.category] = skills.filter((skill) => skill.category === item.category);
    return acc;
  }, {
    BACKEND: [],
    FRONTEND: [],
    DEV_OPS: [],
    LANGUAGE: [],
  });

  return (
    <div className={styles.skills}>
      <section id="skills">
        <SectionTitle title="SKILLS" lineColor="#000000" />
        <div className={styles.box}>

          {isPending && <p className={styles.empty}>스킬 데이터를 불러오는 중입니다.</p>}
          {!isPending && error && <p className={styles.empty}>스킬 데이터를 불러오지 못했습니다.</p>}

          {!isPending && !error && iconList.map((type) => (
            <div key={type.text} className={styles.row}>
              <div className={styles.types}>
                <img className={styles.img} src={type.icon} alt={type.text} />
                {type.text}
              </div>
              <ul className={styles.skillList}>
                {skillsByCategory[type.category].map((skill) => (
                  <SkillTag
                    key={`${type.text}-${skill.id}`}
                    title={skill.name}
                    defaultcolor={!(skill.bgColor && skill.textColor)}
                    bgcolor={skill.bgColor}
                    txtcolor={skill.textColor}
                    show={skill.show}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Skills;
