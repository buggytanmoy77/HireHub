import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="shell page-pad">
      <h1>Welcome, {user?.name}</h1>
      <p className="muted">Upload your resume to get matched roles and explanations.</p>
      <Link to="/resume" className="btn btn-primary">Upload Resume</Link>
    </div>
  );
}