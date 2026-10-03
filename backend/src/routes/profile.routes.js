const express = require("express");

const {
  getProfile,
  createOrUpdateProfile,
} = require("../controllers/profile.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authMiddleware, getProfile);

router.put("/", authMiddleware, createOrUpdateProfile);

module.exports = router;