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
    <div>
      <h2>Suggested roles based on your resume</h2>
      <ul>
        {roles.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>

      <h3>{totalJobs} jobs found</h3>
      {jobs.map((job) => (
        <div key={job.id || job.url}>
          <h4>{job.title}</h4>
          <p>{job.company} — {job.location}</p>
          {job.salary && <p>{job.salary}</p>}
          <p>{job.description}</p>
          <a href={job.url} target="_blank" rel="noopener noreferrer">
            View job
          </a>
        </div>
      ))}
    </div>
  );
}