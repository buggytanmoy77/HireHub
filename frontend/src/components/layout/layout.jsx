import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import "./layout.css";

export default function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
