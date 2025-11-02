import express from "express";
import { createQuestions, analyzeAnswer, analyzeUserSessions } from "../controllers/ai.controller.js";
import { aiLimit } from "../middleware/rateLimits.js";

const router = express.Router();

router.post("/interview-questions", aiLimit, createQuestions);
router.post("/answer-analysis", aiLimit, analyzeAnswer);
router.post("/user-sessions-analysis", aiLimit, analyzeUserSessions);

export default router;