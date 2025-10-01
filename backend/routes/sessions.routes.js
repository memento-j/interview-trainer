import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { createSession, getSession, getUserSessions, updateSession, deleteSession} from "../controllers/sessions.controller.js";

dotenv.config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SR_KEY);
const router = express.Router();

async function requireAuthorization(req, res, next) {
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

//finish authentication for session routes (maybe pass userid in the body?)
function requireAuthentication(req, res, next) {    
    const {id} = req.params
    if  (req.user.id !== id) {
        return res.status(403).json({ error: "Forbidden, not authenticateed" });
    }
    next();
}

router.use(requireAuthorization);
router.post("/", createSession);
router.get("/:sessionId", getSession);
router.get("/user/:userID", getUserSessions);
router.patch("/:sessionId/progress", updateSession);
router.delete("/:sessionId", deleteSession);

export default router;