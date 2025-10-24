import express from "express";
import { getPreLoadedQuestions } from "../controllers/preloadedQuestions.controller.js";
import { readLimit } from "../middleware/rateLimits.js";

const router = express.Router();

router.get("/", readLimit, getPreLoadedQuestions);

export default router