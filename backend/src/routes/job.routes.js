const express = require("express");

const {
  getRecommendedJobs,
  getTrendingJobs
} = require("../controllers/job.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/recommended",
  authMiddleware,
  getRecommendedJobs
);

router.get("/trending", getTrendingJobs);

module.exports = router;