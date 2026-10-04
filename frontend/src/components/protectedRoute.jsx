import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="shell page-pad muted">Loading…</div>;
  // Send guests to login, then bring them back to where they were headed.
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  return children;
}
