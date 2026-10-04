import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/protectedRoute";
import ScrollManager from "./components/scrollManager";
import Layout from "./components/layout/layout";
import Home from "./pages/home/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ResumeUpload from "./pages/resumeUpload";
import Jobs from "./pages/jobs";
import ComingSoon from "./pages/comingSoon";
import { PLACEHOLDER_PAGES } from "./config/navigation";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resume" element={<ProtectedRoute><ResumeUpload /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />

            {PLACEHOLDER_PAGES.map((page) => (
              <Route
                key={page.path}
                path={page.path}
                element={<ComingSoon title={page.title} description={page.description} />}
              />
            ))}

            {/* Dashboard was merged into Home; keep old links working */}
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="*" element={<ComingSoon title="Page not found" description="The page you're looking for doesn't exist or has moved." />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
