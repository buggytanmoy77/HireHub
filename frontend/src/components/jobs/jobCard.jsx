import Icon from "../icons";
import "./jobs.css";

let jobCounter = 0;

function toPlainText(html = "") {
  return new DOMParser()
    .parseFromString(html, "text/html")
    .body.textContent?.trim() ?? "";
}

function timeAgo(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";

  const days = Math.floor((Date.now() - date.getTime()) / 86_400_000);

  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function JobCard({ job }) {
  jobCounter++;

  const description = toPlainText(job.description);
  const posted = job.updated ? timeAgo(job.updated) : "";
  const company = job.company || "Company undisclosed";

  return (
    <article className="job-card">

      <div className="job-number">
        {jobCounter / 2}
      </div>

      <header className="job-card-head">
        <span className="company-badge" aria-hidden="true">
          {company[0].toUpperCase()}
        </span>

        <div className="job-card-title">
          <h3>{toPlainText(job.title)}</h3>
          <p>{company}</p>
        </div>
      </header>

      <ul className="job-tags">
        {job.location && (
          <li>
            <Icon name="pin" size={14} />
            {job.location}
          </li>
        )}

        {job.salary && (
          <li>
            <Icon name="wallet" size={14} />
            {job.salary}
          </li>
        )}

        {job.type && (
          <li>
            <Icon name="briefcase" size={14} />
            {job.type}
          </li>
        )}
      </ul>

      {description && (
        <p className="job-card-desc">
          {description}
        </p>
      )}

      <footer className="job-card-foot">
        <span className="job-posted">
          {posted && (
            <>
              <Icon name="clock" size={14} />
              {posted}
            </>
          )}
        </span>

        {job.url && (
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="job-link"
          >
            View job
            <Icon name="external" size={14} />
          </a>
        )}
      </footer>
    </article>
  );
}

export function JobCardSkeleton() {
  return (
    <div className="job-card is-skeleton" aria-hidden="true">
      <div className="job-number">-</div>

      <div className="job-card-head">
        <span className="company-badge sk" />

        <div className="job-card-title">
          <span className="sk sk-line" style={{ width: "70%" }} />
          <span className="sk sk-line" style={{ width: "40%" }} />
        </div>
      </div>

      <span className="sk sk-line" style={{ width: "55%" }} />
      <span className="sk sk-line" />
      <span className="sk sk-line" style={{ width: "85%" }} />
    </div>
  );
}