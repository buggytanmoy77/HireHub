const prisma = require("../config/db");
const { analyzeResume } = require("../services/ai.service");

const analyzeUserResume = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get the logged-in user's resume
    const resume = await prisma.resume.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
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

    // Send resume text to AI
    const analysis = await analyzeResume(resume.extractedText);

    return res.status(200).json({
      message: "Resume analyzed successfully",
      analysis,
    });
  } catch (error) {
    console.error("Resume analysis error:", error);

    return res.status(500).json({
      message: "Failed to analyze resume",
    });
  }
};

module.exports = {
  analyzeUserResume,
};