const he = require("he");

/**
 * Clean HTML / HTML entities from a job description.
 *
 * Jooble snippets can contain things like:
 * &nbsp;
 * <b>Intern</b>
 * &lt;b&gt;Intern&lt;/b&gt;
 */
const cleanDescription = (description = "") => {
  if (!description || typeof description !== "string") {
    return "";
  }

  return he
    .decode(description)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};


/**
 * Search jobs directly using Jooble.
 */
const searchJobs = async ({
  keywords,
  location = "India",
  page = 1,
  resultOnPage = 20,
}) => {
  if (!keywords) {
    throw new Error("Job search keywords are required");
  }

  if (!process.env.JOOBLE_API_KEY) {
    throw new Error("JOOBLE_API_KEY is not configured");
  }

  const url = `https://in.jooble.org/api/${process.env.JOOBLE_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      keywords,
      location,
      page,
      ResultOnPage: resultOnPage,
      companysearch: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Jooble API error ${response.status}: ${errorText}`
    );
  }

  const data = await response.json();

  return {
    totalCount: data.totalCount || 0,

    jobs: (data.jobs || []).map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      type: job.type,

      // Clean Jooble HTML/HTML entities here
      description: cleanDescription(job.snippet),

      source: job.source,
      url: job.link,
      updated: job.updated,
    })),
  };
};


/**
 * Search jobs using multiple AI-generated queries.
 *
 * Example:
 *
 * [
 *   "Backend Developer Intern",
 *   "Node.js Developer",
 *   "Software Development Engineer Intern",
 *   "Junior Backend Engineer"
 * ]
 */
const searchJobsForQueries = async ({
  queries,
  location = "India",
  maxQueries = 4,
  resultOnPage = 10,
}) => {
  if (!Array.isArray(queries) || queries.length === 0) {
    throw new Error("At least one job search query is required");
  }

  /**
   * Remove:
   * - invalid queries
   * - empty queries
   * - duplicate queries
   */
  const uniqueQueries = [
    ...new Set(
      queries
        .filter(
          (query) =>
            typeof query === "string" &&
            query.trim().length > 0
        )
        .map((query) => query.trim())
    ),
  ];

  /**
   * Limit the number of Jooble API calls.
   */
  const selectedQueries = uniqueQueries.slice(0, maxQueries);

  if (selectedQueries.length === 0) {
    throw new Error("No valid job search queries found");
  }

  /**
   * Search all queries.
   *
   * Promise.allSettled is used so that if one
   * Jooble request fails, the other searches
   * can still return results.
   */
  const results = await Promise.allSettled(
    selectedQueries.map((query) =>
      searchJobs({
        keywords: query,
        location,
        page: 1,
        resultOnPage,
      })
    )
  );

  const allJobs = [];

  /**
   * Collect successful results.
   */
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      allJobs.push(...result.value.jobs);
    } else {
      console.error(
        `Job search failed for query "${selectedQueries[index]}":`,
        result.reason
      );
    }
  });

  /**
   * Remove duplicate jobs.
   *
   * Prefer:
   * 1. Jooble job ID
   * 2. Job URL
   * 3. title + company + location
   */
  const uniqueJobs = [];
  const seen = new Set();

  for (const job of allJobs) {
    const key =
      job.id ||
      job.url ||
      `${job.title}-${job.company}-${job.location}`
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    uniqueJobs.push(job);
  }

  return {
    queries: selectedQueries,
    totalCount: uniqueJobs.length,
    jobs: uniqueJobs,
  };
};


module.exports = {
  searchJobs,
  searchJobsForQueries,
};