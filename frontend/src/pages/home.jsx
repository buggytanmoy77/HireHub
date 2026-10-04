import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="shell hero">
      <h1>Find internships that actually fit — and know why.</h1>
      <p className="lede">
        Upload your resume. We match you to roles based on your real skills,
        not keywords — and show you exactly what's missing before you apply.
      </p>
      <Link to="/signup" className="btn btn-primary">Get started</Link>

      <div className="steps">
        <div className="step">
          <span className="step-num">1</span>
          <div className="step-text"><strong>Upload your resume</strong><span className="muted">We read it, no forms to fill</span></div>
        </div>
        <div className="step">
          <span className="step-num">2</span>
          <div className="step-text"><strong>Get matched roles — with reasons</strong><span className="muted">Not just a score, an explanation</span></div>
        </div>
        <div className="step">
          <span className="step-num">3</span>
          <div className="step-text"><strong>See your skill gaps</strong><span className="muted">Know what to learn before you apply</span></div>
        </div>
      </div>
    </div>
  );
}