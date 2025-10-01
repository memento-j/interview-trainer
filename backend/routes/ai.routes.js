import express from "express";
import { createQuestions, analyzeAnswer } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/interview-questions", createQuestions);
router.post("/answer-analysis", analyzeAnswer);

export default router;