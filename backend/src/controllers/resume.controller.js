const prisma = require("../config/db");
const imagekit = require("../config/imagekit");
const { toFile } = require("@imagekit/nodejs");

const {
  extractTextFromResume,
} = require("../services/resume.service");

const uploadResume = async (req, res) => {
  try {
    // 1. Check whether a file was uploaded
    if (!req.file) {
      return res.status(400).json({
        message: "Resume PDF is required",
      });
    }

    // 2. Check user authentication
    const userId = req.user.id;

    console.log("Resume received:", {
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype,
    });

    // 3. Extract text from PDF
    const extractedText = await extractTextFromResume(
      req.file.buffer
    );

    console.log("Resume text extracted successfully");

    // 4. Upload PDF to ImageKit
    const fileName = `resume-${userId}-${Date.now()}.pdf`;

    const uploadResponse = await imagekit.files.upload({
      file: await toFile(
        req.file.buffer,
        req.file.originalname
      ),
      fileName,
      folder: "/hirehub/resumes",
      useUniqueFileName: true,
    });

    console.log("Resume uploaded to ImageKit");

    // 5. Save/update resume in PostgreSQL
    const resume = await prisma.resume.upsert({
      where: {
        userId,
      },

      update: {
        fileName: uploadResponse.name,
        fileUrl: uploadResponse.url,
        fileId: uploadResponse.fileId,
        extractedText,
      },

      create: {
        userId,
        fileName: uploadResponse.name,
        fileUrl: uploadResponse.url,
        fileId: uploadResponse.fileId,
        extractedText,
      },
    });

    // 6. Send response
    return res.status(200).json({
      message: "Resume uploaded successfully",
      resume: {
        id: resume.id,
        fileName: resume.fileName,
        fileUrl: resume.fileUrl,
        //extractedText: resume.extractedText,
      },
    });
  } catch (error) {
    console.error("Resume upload error:", error);

    return res.status(500).json({
      message: "Failed to upload resume",
    });
  }
};

module.exports = {
  uploadResume,
};