const express = require("express");

const {
  analyzeUserResume,
} = require("../controllers/ai.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/analyze-resume",
  authMiddleware,
  analyzeUserResume
);

module.exports = router;