import express from "express";
import { createClient } from "@supabase/supabase-js";
import { getPreLoadedQuestions } from "../controllers/preloadedQuestions.controller.js";

const router = express.Router();

router.get("/", getPreLoadedQuestions);

export default router