import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Article from "./pages/Article";
import Articles from "./pages/Articles";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      {/* <Route path="주소규칙" element={보여 줄 컴포넌트 JSX} /> */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* URL 파라미터의 이름은 라우터를 설정할 때 Route 컴포넌트의 path props를 통해 설정 */}
        <Route path="/profiles/:username" element={<Profile />} />
        <Route path="/articles" element={<Articles />}>
          <Route path="/articles/:id" element={<Article />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
