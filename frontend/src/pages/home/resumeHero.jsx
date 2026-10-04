import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import ResumeDropzone from "../../components/resumeDropzone";
import Icon from "../../components/icons";

const STEPS = [
  { title: "Upload your resume", text: "We read it — no long forms to fill." },
  { title: "Get matched roles, with reasons", text: "Not just a score — an explanation." },
  { title: "See your skill gaps", text: "Know what to learn before you apply." },
];

const PERKS = ["Free to use", "Results in under a minute", "Your data stays private"];

export default function ResumeHero() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const firstName = user?.name?.split(" ")[0];

  return (
    <section className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy">
          {user ? (
            <p className="eyebrow">Welcome back, {firstName}</p>
          ) : (
            <p className="eyebrow"><Icon name="sparkle" size={14} /> AI-powered job matching</p>
          )}

          <h1>
            Upload your resume.
            <br />
            Get jobs that <em>actually fit.</em>
          </h1>

          <p className="lede">
            Upload your resume to get personalized recommendations and
            opportunities — matched to your real skills, with a clear
            explanation of why each role fits and what's missing.
          </p>

          <div className="hero-ctas">
            {user ? (
              <Link to="/jobs" className="btn btn-primary btn-lg">
                View my recommendations <Icon name="arrowRight" size={18} />
              </Link>
            ) : (
              <Link to="/resume" className="btn btn-primary btn-lg">
                <Icon name="upload" size={18} /> Upload Resume
              </Link>
            )}
            <a href="#trending" className="btn btn-ghost btn-lg">Browse trending jobs</a>
          </div>

          <ul className="perks">
            {PERKS.map((perk) => (
              <li key={perk}><Icon name="check" size={16} />{perk}</li>
            ))}
          </ul>
        </div>

        <div className="hero-card">
          {user ? (
            <>
              <h2 className="hero-card-title">Get personalized recommendations</h2>
              <p className="muted">Drop in your latest resume and we'll match you to roles in under a minute.</p>
              <ResumeDropzone onUploaded={() => navigate("/jobs")} />
            </>
          ) : (
            <>
              <h2 className="hero-card-title">How it works</h2>
              <ol className="steps">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="step">
                    <span className="step-num">{i + 1}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <span className="muted">{step.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <Link to="/signup" className="btn btn-primary btn-block">Create a free account</Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
