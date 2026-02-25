import ProjectCard from "../../../components/ui/ProjectCard";

const mockProjects = [
  {
    id: 1,
    title: "IT 엘도라도",
    memberCount: 3,
    serviceLink: "https://example.com",
    startDate: "2026-02-24",
    endDate: "2026-03-04",
    techStack: ["Java", "TypeScript", "PostgreSQL"],
  },
  {
    id: 2,
    title: "포트폴리오 사이트",
    memberCount: 1,
    serviceLink: "https://portfolio.com",
    startDate: "2026-01-01",
    endDate: "2026-02-01",
    techStack: ["React", "Supabase"],
  },
];

const Projects = () => {
  return (
    <div>
      {mockProjects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          memberCount={project.memberCount}
          serviceLink={project.serviceLink}
          startDate={project.startDate}
          endDate={project.endDate}
          techStack={project.techStack}
        />
      ))}
    </div>
  );
};

export default Projects;