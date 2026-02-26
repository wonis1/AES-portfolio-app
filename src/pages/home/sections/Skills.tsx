import SkillTag from "../../../components/ui/SkillTag";
import SectionTitle from "../../../components/ui/SectionTitle";
import styles from "../styles/Skills.module.css"

import languageIcon from "../../../assets/icons/language-icon.png"
import frontendIcon from "../../../assets/icons/html-icon.png"
import backendIcon from "../../../assets/icons/backend-icon.png"
import devopsIcon from "../../../assets/icons/server-icon.png"

const Skills = () => {

  const iconList = [
    { icon: languageIcon, text: 'Language' },
    { icon: frontendIcon, text: 'Frontend' },
    { icon: backendIcon, text: "Backend" },
    { icon: devopsIcon, text: 'DevOps' }
  ]

  const skillList = [
    // Language
    { category: 'Language', name: 'TypeScript' },
    { category: 'Language', name: 'JavaScript' },
    { category: 'Language', name: 'Python' },
    { category: 'Language', name: 'Java' },
    { category: 'Language', name: 'Kotlin' },
    // Frontend
    { category: 'Frontend', name: 'React' },
    { category: 'Frontend', name: 'Next.js' },
    { category: 'Frontend', name: 'Vite' },
    { category: 'Frontend', name: 'Tailwind CSS' },
    { category: 'Frontend', name: 'Sass' },
    { category: 'Frontend', name: 'React Query' },
    { category: 'Frontend', name: 'Zustand' },
    // Backend
    { category: 'Backend', name: 'Spring Boot' },
    { category: 'Backend', name: 'Django' },
    { category: 'Backend', name: 'Node.js' },
    { category: 'Backend', name: 'Supabase' },
    { category: 'Backend', name: 'Firebase' },
    { category: 'Backend', name: 'PostgreSQL' },
    // DevOps
    { category: 'DevOps', name: 'Docker' },
    { category: 'DevOps', name: 'Kubernetes' },
    { category: 'DevOps', name: 'AWS ECS' },
    { category: 'DevOps', name: 'AWS EC2' },
    { category: 'DevOps', name: 'Redis' },
    { category: 'DevOps', name: 'Vercel' },
  ];


  return (
    <div className={styles.skills}>
      <section id="skills">
        <SectionTitle title="SKILLS" lineColor="#000000" />
        <div className={styles.box}>

          {iconList.map((type) => (
            <div key={type.text} className={styles.row}>
              <div className={styles.types}>
                <img className={styles.img} src={type.icon} alt={type.text} />
                {type.text}
              </div>
              <ul className={styles.skillList}>
                {skillList.filter((c) => c.category == type.text).map((e) => (
                  <SkillTag key={`${type.text}-${e.name}`} title={e.name} defaultcolor = {true}/>
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
