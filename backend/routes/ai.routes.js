import express from "express";
import { createQuestions, analyzeAnswer } from "../controllers/ai.controller.js";
import { aiLimit } from "../middleware/rateLimits.js";

const router = express.Router();

router.post("/interview-questions", aiLimit, createQuestions);
router.post("/answer-analysis", aiLimit, analyzeAnswer);

export default router;