// src/pages/Dashboard.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <nav>
        <Link to="/resume">Upload Resume</Link>
      </nav>
      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
}