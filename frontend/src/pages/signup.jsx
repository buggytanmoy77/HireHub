import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signup(name, email, password);
      // Carry the original destination through to login.
      navigate("/login", { state: location.state });
    } catch (err) {
      const status = err.response?.status;
      if (status === 409) setError("An account with this email already exists — try logging in");
      else if (status === 400) setError(err.response.data?.message || "Please fill in all fields");
      else if (!err.response) setError("Can't reach the server — please try again shortly");
      else setError("Something went wrong on our side — please try again");
    }
  }

  return (
    <div className="shell auth-page">
      <div className="auth-card">
        <h1>Create your account</h1>
        <p className="muted">Free forever. Get matched to roles in under a minute.</p>
        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Full name</span>
            <input className="input" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" required />
          </label>
          <label className="field">
            <span>Email</span>
            <input className="input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </label>
          <label className="field">
            <span>Password</span>
            <input className="input" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </label>
          {error && <p className="error-text" role="alert">{error}</p>}
          <button type="submit" className="btn btn-primary btn-block">Sign up</button>
        </form>
        <p className="muted auth-switch">Already have an account? <Link to="/login" state={location.state}>Log in</Link></p>
      </div>
    </div>
  );
}
