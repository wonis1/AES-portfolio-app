import { Link } from "react-router-dom";
import SectionTitle from "../../components/ui/SectionTitle";
import SkillTag from "../../components/ui/SkillTag";

const Home = () => {

    return (
        <div>
            <SectionTitle title="- 정재원 - 프론트엔드 개발자 포트폴리오" lineUse = {false} iconUse = {false}/>
            <SectionTitle title="ABOUT ME" lineColor="#cccccc"/>
            <SectionTitle title="SKILLS" lineColor="#000000"/>
            <SectionTitle title="ARCHIVING" lineColor="#ffffff"/>
            <SectionTitle title="PROJECTS" lineColor="#000000"/>
            <SkillTag title="TypeScript" />
            <SkillTag title="React" bgcolor="red" txtcolor="blue"/>
            <Link to="/projectDetail">
                <button type="button">점심먹기</button>
            </Link>
        </div>
    );
}

export default Home;
