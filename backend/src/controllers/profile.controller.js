const prisma = require("../config/db");

const getProfile = async (req, res) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      profile,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const createOrUpdateProfile = async (req, res) => {
  try {
    const {
      phone,
      location,
      bio,
      skills,
      experience,
    } = req.body;

    const profile = await prisma.profile.upsert({
      where: {
        userId: req.user.id,
      },

      update: {
        phone,
        location,
        bio,
        skills,
        experience,
      },

      create: {
        userId: req.user.id,
        phone,
        location,
        bio,
        skills,
        experience,
      },
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getProfile,
  createOrUpdateProfile,
};