import SectionTitle from "../../../components/ui/SectionTitle";
import CareerCard from "../../../components/ui/CareerCard";
import styles from "../styles/Career.module.css";
import { useQuery } from "@tanstack/react-query";
import { getCareers } from "../../../api/careers";


const Career = () => {
  const {
    data: careers = [],
  } = useQuery({
    queryKey: ["careers"],
    queryFn: getCareers,
  })


  return (
    <section id="career" className={styles.career}>
      <div className={styles.content}>
        <SectionTitle title="CAREER" lineColor="#000000" />
        {careers.map((career) => (
          <CareerCard
            key={career.id}
            logoUrl={career.logoUrl}
            company={career.company}
            startDate={career.startDate}
            endDate={career.endDate}
            intro={career.intro}
            works={career.works}
          />

        ))}
      </div>
    </section>
  );
};

export default Career;
