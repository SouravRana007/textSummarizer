import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Files from "./pages/Files";
import SummaryReview from "./pages/SummaryReview";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import { getCurrentUser } from "./api/auth";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [userQuery, setUserQuery] = useState({
    isLoading: true,
    data: null,
  });

  useEffect(() => {
    (async () => {
      let data = null;
      try {
        const res = await getCurrentUser();
        data = res;
      } catch (err) {
        console.log("get profile err: ", err);
      } finally {
        setUserQuery({
          isLoading: false,
          data,
        });
      }
    })();
  }, []);

  useEffect(() => {
    const publicPaths = ["/", "/login", "/register"];
    const isPublicPath = publicPaths.includes(pathname);

    if (!userQuery.isLoading) {
      if (!userQuery.data && !isPublicPath) {
        navigate("/login", { replace: true });
      } else if (userQuery.data && isPublicPath) {
        navigate("/", { replace: true });
      }
    }
  }, [userQuery.data, userQuery.isLoading]);

  if (userQuery.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/files" element={<Files />} />
          <Route path="/files/:fileId" element={<SummaryReview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </>
  );
}

export default App;
