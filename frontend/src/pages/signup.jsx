import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext"; 

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate("/login"); 
    } catch (err) {
      setError("Could not sign up — try a different email");
    }
  }

  return (
    <div className="shell page-pad">
      <h2>Sign Up</h2>
      <form className = "form" onSubmit={handleSubmit}>
        <input className="input"  value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      <p className="muted">Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
}