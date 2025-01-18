import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login";
import Register from "./pages/register";
import Files from "./pages/Files";
import SummaryReview from "./pages/SummaryReview";
import Layout from "./components/layout";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/files" element={<Files />} />
          <Route path="/files/:fileId" element={<SummaryReview />} />
          <Route path="/login" element={<Login />} />

          {/* <Login /> */}
        </Routes>
      </Layout>
      <ToastContainer />
    </>
  );
}

export default App;
