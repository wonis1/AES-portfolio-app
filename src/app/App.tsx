import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import ProjectDetail from "../pages/projectDetails/ProjectDetail";

function App() {
  return (
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projectDetail" element={<ProjectDetail />} />
    </Routes>
  </div>
  )
}

export default App;
