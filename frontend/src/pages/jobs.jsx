import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JobCard, { JobCardSkeleton } from "../components/jobs/jobCard";
import { getRecommendedJobs } from "../services/jobs";

export default function Jobs() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error | no-resume
  const [error, setError] = useState("");

  useEffect(() => {
    getRecommendedJobs()
      .then((res) => {
        setData(res);
        setStatus("ready");
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setStatus("no-resume");
        } else {
          setStatus("error");
          setError(err.response?.data?.message || "Something went wrong");
        }
      });
  }, []);

  if (status === "loading") {
    return (
      <div className="shell page-pad">
        <div className="page-head">
          <h1>Your recommended jobs</h1>
          <p className="lede">Finding jobs that match your resume…</p>
        </div>
        <div className="job-grid">
          {Array.from({ length: 6 }, (_, i) => <JobCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (status === "no-resume") {
    return (
      <div className="shell page-pad">
        <div className="empty-state">
          <h3>You haven't uploaded a resume yet</h3>
          <p className="muted">Upload one to get personalized job recommendations.</p>
          <Link to="/resume" className="btn btn-primary">Upload your resume</Link>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="shell page-pad">
        <div className="empty-state">
          <h3>Couldn't load recommendations</h3>
          <p className="muted">{error}</p>
        </div>
      </div>
    );
  }

  const { roles, totalJobs, jobs } = data;

  return (
    <div className="shell page-pad">
      <div className="page-head">
        <h1>Your recommended jobs</h1>
        <p className="lede">Based on your resume, these roles are a strong fit.</p>
      </div>

      <h2 className="subhead">Suggested roles</h2>
      <ul className="roles-list">
        {roles.map((r, idx) => (
          <li className="role-item" key={r.role || idx}>
            <strong>{r.role}</strong>
            {r.reason && <span className="reason">{r.reason}</span>}
          </li>
        ))}
      </ul>

      <h2 className="subhead">{totalJobs} jobs found</h2>
      <div className="job-grid">
        {jobs.map((job) => <JobCard key={job.id || job.url} job={job} />)}
      </div>
    </div>
  );
}
