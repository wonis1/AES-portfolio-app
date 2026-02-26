import SectionTitle from "../../../components/ui/SectionTitle";
import CareerCard, { type CareerItem } from "../../../components/ui/CareerCard";
import githubIcon from "../../../assets/icons/github-icon.png";
import styles from "../styles/Career.module.css";

const careers: CareerItem[] = [
  {
    logoSrc: githubIcon, // TODO: Supabase에서 회사 로고 URL로 교체
    company: "(주) 당근마켓",
    period: "2024.11 - (재직 중)",
    slogan: '"이웃과 더 가까워지는 따뜻한 동네를 만들어요"',
    roles: ["Frontend 개발", "Backend 개발"],
    works: [
      {
        title: "비즈프로필 기반의 당근 3탭 서비스 개발",
        detail: "당근 3탭(동네지도)의 유입 확보를 위한 비즈프로필 기반의 서비스 개발 (Frontend, Backend)",
      },
      {
        title: "비즈프로필 웹뷰의 플랫폼 개발",
        when: "2024년 상반기",
        detail: "비즈프로필 웹뷰의 생산성, 안정성, 성능을 개선하기 위한 플랫폼 개발 (Frontend)",
      },
      {
        title: "지역 동네 업체 정보(비즈프로필) 관련 개발",
        when: "2024년 하반기",
        detail: "이웃의 사장님들과 고객님들을 효과적으로 연결하기 위한 비즈프로필 관련 기능 개발 (Frontend)",
      },
    ],
  },
];

const Career = () => {
  return (
    <section id="career" className={styles.career}>
      <div className={styles.content}>
        <SectionTitle title="CAREER" lineColor="#000000" />
        {careers.map((career) => (
          <CareerCard
            key={`${career.company}-${career.period}`}
            logoSrc={career.logoSrc}
            company={career.company}
            period={career.period}
            slogan={career.slogan}
            roles={career.roles}
            works={career.works}
          />
        ))}
      </div>
    </section>
  );
};

export default Career;
