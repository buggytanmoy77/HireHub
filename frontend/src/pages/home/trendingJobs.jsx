import { useEffect, useState } from "react";
import JobCard, { JobCardSkeleton } from "../../components/jobs/jobCard";
import Icon from "../../components/icons";
import { getTrendingJobs } from "../../services/jobs";

const LIMIT = 6;

// Deliberately independent of auth and resume state.
export default function TrendingJobs() {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getTrendingJobs({ limit: LIMIT })
      .then((data) => {
        if (cancelled) return;
        setJobs(data);
        setStatus("ready");
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => { cancelled = true; };
  }, [attempt]);

  function retry() {
    setStatus("loading");
    setAttempt((n) => n + 1);
  }

  return (
    <section id="trending" className="section">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow"><Icon name="trending" size={14} /> Trending now</p>
            <h2>Trending jobs</h2>
            <p className="muted">The most in-demand openings on HireHub right now — no resume needed.</p>
          </div>
        </div>

        {status === "loading" && (
          <div className="job-grid">
            {Array.from({ length: LIMIT }, (_, i) => <JobCardSkeleton key={i} />)}
          </div>
        )}

        {status === "error" && (
          <div className="empty-state">
            <h3>Couldn't load trending jobs</h3>
            <p className="muted">Something went wrong on our side. Please try again in a moment.</p>
            <button className="btn btn-ghost" onClick={retry}>
              <Icon name="refresh" size={16} /> Try again
            </button>
          </div>
        )}

        {status === "ready" && jobs.length === 0 && (
          <div className="empty-state">
            <h3>No trending jobs right now</h3>
            <p className="muted">Check back soon — new openings are added throughout the day.</p>
          </div>
        )}

        {status === "ready" && jobs.length > 0 && (
          <div className="job-grid">
            {jobs.map((job) => <JobCard key={job.id || job.url} job={job} />)}
          </div>
        )}
      </div>
    </section>
  );
}
