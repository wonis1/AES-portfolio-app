import About from "./sections/About";
import Career from "./sections/Career";
import Intro from "./sections/Intro";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <Intro />
      <About />
      <Skills />
      <Projects />
      <Career />
      <Footer />
    </div>
  );
};

export default Home;
