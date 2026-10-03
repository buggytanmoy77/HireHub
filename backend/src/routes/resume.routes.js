const express = require("express");

const {
  uploadResume,
} = require("../controllers/resume.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

module.exports = router;