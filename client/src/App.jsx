import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login";
import Register from "./pages/register";
import Files from "./pages/Files";
import SummaryReview from "./pages/SummaryReview";
import Layout from "./components/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Routes>
            <Route path="/" element={<Files />} />
            <Route path="/register" element={<Register />} />
            <Route path="/files" element={<Files />} />
            <Route path="/files/:fileId" element={<SummaryReview />} />
            <Route path="/login" element={<Login />} />

            {/* <Login /> */}
          </Routes>
        </Layout>
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
