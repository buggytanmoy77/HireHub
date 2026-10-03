const express = require("express");

const {
  getRecommendedJobs,
} = require("../controllers/job.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/recommended",
  authMiddleware,
  getRecommendedJobs
);

module.exports = router;