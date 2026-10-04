import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <div className="nav">
      <Link to="/" className="brand">HireHub</Link>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/jobs">Jobs</Link>
            <button className="btn" onClick={() => logout()}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/signup" className="btn btn-primary">Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}