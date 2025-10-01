import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { createSession, getSession, getUserSessions, updateSession, deleteSession} from "../controllers/sessions.controller.js";

dotenv.config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SR_KEY);
const router = express.Router();

export async function requireAuth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
        return res.status(401).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
}

router.post("/", requireAuth, createSession);
router.get("/:id", getSession);
router.get("/user/:userID", requireAuth, getUserSessions);
router.patch("/:id/progress", updateSession);
router.delete("/:id", deleteSession)

export default router;