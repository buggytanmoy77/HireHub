import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { NAV_LINKS } from "../../config/navigation";
import Icon from "../icons";
import Logo from "./logo";

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setMenuOpen(false);

  async function handleLogout() {
    closeMenu();
    await logout();
    navigate("/");
  }

  return (
    <header className="site-header">
      <nav className="navbar shell" aria-label="Main">
        <Link to="/" className="brand" onClick={closeMenu}>
          <Logo />
          <span>HireHub</span>
        </Link>

        <button
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={22} />
        </button>

        <div id="nav-menu" className={`nav-menu${menuOpen ? " is-open" : ""}`}>
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            {user ? (
              <>
                <span className="nav-user">
                  <span className="avatar" aria-hidden="true">{initials(user.name)}</span>
                  <span className="nav-user-name">{user.name}</span>
                </span>
                <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm" onClick={closeMenu}>Log in</Link>
                <Link to="/signup" className="btn btn-primary btn-sm" onClick={closeMenu}>Sign up</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
