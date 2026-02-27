import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "../../../components/ui/ProjectCard";
import styles from "../styles/Projects.module.css";
import SectionTitle from "../../../components/ui/SectionTitle";
import SkillTag from "../../../components/ui/SkillTag";
import { getProjects } from "../../../api/projects";
import { getSkills } from "../../../api/skills";

const Projects = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStack, setSelectedStack] = useState<string | null>(null);

  const {
    data: projects = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const { data: skills = [] } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });

  const skillColorMap = useMemo(() => {
    return skills.reduce<Record<string, { bgColor: string; textColor: string }>>((acc, skill) => {
      acc[skill.name.toLowerCase()] = {
        bgColor: skill.bgColor,
        textColor: skill.textColor,
      };
      return acc;
    }, {});
  }, [skills]);

  const stackFilters = useMemo(() => {
    const stackSet = new Set<string>();
    projects.forEach((project) => {
      project.techStack.forEach((stack) => stackSet.add(stack));
    });

    return Array.from(stackSet);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const query = searchKeyword.trim().toLowerCase();
      const fullText = `${project.title} ${project.intro} ${project.descriptions.join(" ")} ${project.techStack.join(" ")}`.toLowerCase();
      const matchesSearch = query.length === 0 || fullText.includes(query);
      const matchesStack = selectedStack === null || project.techStack.some((stack) => stack.toLowerCase() === selectedStack.toLowerCase());
      return matchesSearch && matchesStack;
    });
  }, [projects, searchKeyword, selectedStack]);

  return (
    <section id="projects" className={styles.projectsSection}>
      <SectionTitle title = "PROJECTS" lineColor= {"black"} />

      <div className={styles.searchWrap}>
        <input
          className={styles.searchInput}
          type="text"
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
          placeholder="검색어를 입력해 보세요."
          aria-label="프로젝트 검색"
        />
        <span className={styles.searchIcon}>⌕</span>
      </div>

      <div className={styles.filterRow}>
        {stackFilters.map((stack) => {
          const isActive = selectedStack === stack;
          const skillColor = skillColorMap[stack.toLowerCase()];
          const hasCustomColor = Boolean(skillColor?.bgColor && skillColor?.textColor);
          return (
            <SkillTag
              key={stack}
              as="button"
              title={stack}
              defaultcolor={!hasCustomColor}
              bgcolor={skillColor?.bgColor}
              txtcolor={skillColor?.textColor}
              active={isActive}
              onClick={() => setSelectedStack((current) => (current === stack ? null : stack))}
            />
          );
        })}
      </div>

      {isPending && <p className={styles.empty}>프로젝트 데이터를 불러오는 중입니다.</p>}
      {!isPending && error && <p className={styles.empty}>프로젝트 데이터를 불러오지 못했습니다.</p>}

      <div className={styles.cardGrid}>
        {!isPending && !error && filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            intro={project.intro}
            descriptions={project.descriptions}
            memberCount={project.memberCount}
            serviceLink={project.serviceLink}
            startDate={project.startDate}
            endDate={project.endDate}
            techStack={project.techStack}
            skillColorMap={skillColorMap}
            detailPath="/projectDetail"
          />
        ))}
      </div>

      {!isPending && !error && filteredProjects.length === 0 && <p className={styles.empty}>검색 조건에 맞는 프로젝트가 없습니다.</p>}
    </section>
  );
};

export default Projects;
