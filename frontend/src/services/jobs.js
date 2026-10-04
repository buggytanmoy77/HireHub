import api from "./api";

/*
 * Trending jobs — public, independent of the user's resume.
 *
 * Expected contract (backend endpoint pending):
 *   GET /api/jobs/trending        (no auth required)
 *   200 → { jobs: Job[] }
 *
 * Job uses the same shape job.service.js already returns:
 *   { id, title, company, location, salary, type, description, source, url, updated }
 *
 * A bare array response is also accepted, so the backend can return either.
 */
export async function getTrendingJobs({ limit = 6 } = {}) {
  const res = await api.get("/jobs/trending", { params: { limit } });
  const jobs = Array.isArray(res.data) ? res.data : res.data?.jobs ?? [];
  return jobs.slice(0, limit);
}

// Resume-based recommendations (requires auth + uploaded resume).
export async function getRecommendedJobs() {
  const res = await api.get("/jobs/recommended");
  return res.data;
}
