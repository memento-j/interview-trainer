import express from "express";
import { createClient } from "@supabase/supabase-js";
import { getProfile, updateProfile, deleteProfile } from "../controllers/profiles.controller.js";

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SR_KEY);

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

function requireAuthentication(req, res, next) {    
    const {id} = req.params
    if  (req.user.id !== id) {
        return res.status(403).json({ error: "Forbidden, not authenticateed" });
    }
    next();
}

router.use(requireAuthorization);
router.get("/:id", requireAuthentication, getProfile);
router.patch("/:id", requireAuthentication, updateProfile);
router.delete("/:id", requireAuthentication, deleteProfile);

export default router;