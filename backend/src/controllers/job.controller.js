const prisma = require("../config/db");

const { analyzeResume } = require("../services/ai.service");
const {
  searchJobsForQueries,
} = require("../services/job.service");

const getRecommendedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Get user's resume
    const resume = await prisma.resume.findUnique({
      where: {
        userId,
      },
      select: {
        extractedText: true,
      },
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found. Please upload a resume first.",
      });
    }

    if (!resume.extractedText) {
      return res.status(400).json({
        message: "Resume text is not available.",
      });
    }

    // 2. Analyze resume with Gemini
    const analysis = await analyzeResume(
      resume.extractedText
    );

    // 3. Search jobs using multiple AI-generated queries
    const jobResults = await searchJobsForQueries({
      queries: analysis.searchQueries,
      location: "India",
      maxQueries: 4,
      resultOnPage: 10,
    });

    // 4. Return jobs
    return res.status(200).json({
      message: "Recommended jobs fetched successfully",

      roles: analysis.suitableRoles,

      queries: jobResults.queries,

      totalJobs: jobResults.totalCount,

      jobs: jobResults.jobs,
    });
  } catch (error) {
    console.error("Recommended jobs error:", error);

    return res.status(500).json({
      message: "Failed to fetch recommended jobs",
    });
  }
};

module.exports = {
  getRecommendedJobs,
};