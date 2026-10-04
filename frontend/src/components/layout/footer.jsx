import { Link } from "react-router-dom";
import { FOOTER_COLUMNS, SOCIAL_LINKS } from "../../config/navigation";
import Icon from "../icons";
import Logo from "./logo";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand brand-inverse">
            <Logo />
            <span>HireHub</span>
          </Link>
          <p>
            Matching students and early-career talent to roles that fit their
            real skills — and showing exactly what to learn next.
          </p>
          <ul className="social-links">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  <Icon name={s.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.heading} className="footer-col">
            <h4>{col.heading}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="shell footer-bottom">
        <span>© {YEAR} HireHub. All rights reserved.</span>
        <span>Made for job seekers, by job seekers.</span>
      </div>
    </footer>
  );
}
