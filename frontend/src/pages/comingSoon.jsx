import { Link } from "react-router-dom";
import Icon from "../components/icons";

// Shared placeholder for navbar/footer sections that aren't built yet.
export default function ComingSoon({ title, description }) {
  return (
    <div className="shell page-pad">
      <div className="coming-soon">
        <span className="badge">In development</span>
        <h1>{title}</h1>
        <p className="lede">{description}</p>
        <div className="coming-soon-actions">
          <Link to="/" className="btn btn-primary">Back to home</Link>
          <Link to="/#trending" className="btn btn-ghost">
            Browse trending jobs <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
