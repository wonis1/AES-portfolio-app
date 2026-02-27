import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px" }}>
      <section style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>404</h1>
        <p style={{ marginBottom: "16px" }}>요청하신 페이지를 찾을 수 없습니다.</p>
        <button type="button" onClick={() => navigate("/")}>홈으로 이동</button>
      </section>
    </main>
  );
};

export default NotFound;
