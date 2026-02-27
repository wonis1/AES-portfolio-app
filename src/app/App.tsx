import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import ProjectDetail from "../pages/projectDetails/ProjectDetail";
import NotFound from "../pages/notFound/NotFound";

function App() {
  return (
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projectDetail/:slug" element={<ProjectDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
  )
}

export default App;
