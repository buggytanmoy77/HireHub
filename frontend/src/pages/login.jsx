import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(location.state?.from || "/", { replace: true });
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 400) setError("Invalid email or password");
      else if (!err.response) setError("Can't reach the server — please try again shortly");
      else setError("Something went wrong on our side — please try again");
    }
  }

  return (
    <div className="shell auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="muted">Log in to see your personalized job matches.</p>
        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <input className="input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </label>
          <label className="field">
            <span>Password</span>
            <input className="input" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </label>
          {error && <p className="error-text" role="alert">{error}</p>}
          <button type="submit" className="btn btn-primary btn-block">Log in</button>
        </form>
        <p className="muted auth-switch">No account? <Link to="/signup" state={location.state}>Sign up</Link></p>
      </div>
    </div>
  );
}
