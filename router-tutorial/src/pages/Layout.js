import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigation = useNavigate();

  const goBack = () => {
    navigation(-1);
  };

  const goArticle = () => {
    navigation("/articles", { replace: true });
  };

  return (
    <div>
      <header style={{ background: "lightgreen", padding: 16, fontSize: 24 }}>
        <button onClick={goBack}>뒤로가기</button>
        <button onClick={goArticle}>게시글로 가기</button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
