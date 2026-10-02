import { useAuth } from "../context/authContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}