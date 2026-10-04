import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Jobs() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error | no-resume
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/jobs/recommended")
      .then((res) => {
        setData(res.data);
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

  if (status === "loading") return <p>Finding jobs that match your resume...</p>;

  if (status === "no-resume") {
    return (
      <div>
        <p>You haven't uploaded a resume yet.</p>
        <Link to="/resume">Upload your resume</Link>
      </div>
    );
  }

  if (status === "error") return <p>{error}</p>;

  const { roles, totalJobs, jobs } = data;

  return (
    <div className="shell page-pad">
      <h2>Suggested roles based on your resume</h2>
      <ul className="roles-list">
        {roles.map((r, idx) => (
          <li className="role-item" key={r.role || idx}>
            <strong>{r.role}</strong>
            {r.reason && <span className="reason">{r.reason}</span>}
          </li>
        ))}
      </ul>

      <h3>{totalJobs} jobs found</h3>
      <div className="jobs-list">
        {jobs.map((job) => (
          <div className="job-item" key={job.id || job.url}>
            <h4>{job.title}</h4>
            <p className="job-meta">{job.company} — {job.location}{job.salary ? ` · ${job.salary}` : ""}</p>
            <p className="muted">{job.description}</p>
            <a href={job.url} target="_blank" rel="noopener noreferrer" className="view-link">View job →</a>
          </div>
        ))}
      </div>
    </div>
  );
}