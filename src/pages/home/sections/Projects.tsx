import { useMemo, useState } from "react";
import ProjectCard from "../../../components/ui/ProjectCard";
import styles from "../styles/Projects.module.css";
import SectionTitle from "../../../components/ui/SectionTitle";

const STACK_FILTERS = ["java", "spring", "react", "docker", "javaScript", "TypeScript", "spring Boot"];

const mockProjects = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  title: "프로젝트 제목 (ex. IT 엘도라도 (블로그))",
  intro: "ex. Notion API/DB와 연동하여 개발한 개인블로그",
  descriptions: [
    "프로젝트 설명(Ex. 티스토리 플랫폼에서의 불편함을 해소하고자 직접 개발)",
    "프로젝트 설명(Ex. 티스토리 플랫폼에서의 불편함을 해소하고자 직접 개발)",
    "프로젝트 설명(Ex. 티스토리 플랫폼에서의 불편함을 해소하고자 직접 개발)",
  ],
  memberCount: 3,
  serviceLink: "https://example.com",
  startDate: "2026-02-24",
  endDate: "2026-03-04",
  techStack: ["java", "javaScript", "postgrsql"],
  highlighted: index === 1,
}));

const Projects = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStack, setSelectedStack] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const query = searchKeyword.trim().toLowerCase();
      const fullText = `${project.title} ${project.intro} ${project.descriptions.join(" ")} ${project.techStack.join(" ")}`.toLowerCase();
      const matchesSearch = query.length === 0 || fullText.includes(query);
      const matchesStack = selectedStack === null || project.techStack.some((stack) => stack.toLowerCase() === selectedStack.toLowerCase());
      return matchesSearch && matchesStack;
    });
  }, [searchKeyword, selectedStack]);

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
        {STACK_FILTERS.map((stack) => {
          const isActive = selectedStack === stack;
          return (
            <button
              key={stack}
              type="button"
              className={`${styles.filterChip} ${isActive ? styles.filterChipActive : ""}`}
              onClick={() => setSelectedStack((current) => (current === stack ? null : stack))}
            >
              {stack}
            </button>
          );
        })}
      </div>

      <div className={styles.cardGrid}>
        {filteredProjects.map((project) => (
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
            highlighted={project.highlighted}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && <p className={styles.empty}>검색 조건에 맞는 프로젝트가 없습니다.</p>}
    </section>
  );
};

export default Projects;
