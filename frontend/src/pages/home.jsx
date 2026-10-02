import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>HireHub</h1>
      <p>Find internships that actually match your skills.</p>
      <Link to="/login">Log In</Link> | <Link to="/signup">Sign Up</Link>
    </div>
  );
}