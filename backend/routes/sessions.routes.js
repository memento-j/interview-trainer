import express from "express";
import { createSession, getSessionData, getUserSessionsData, updateSession, deleteSession} from "../controllers/sessions.controller.js";
import { requireAuthorization } from "../middleware/requireAuthorization.js";
import { requireAuthentication } from "../middleware/requireAuthentication.js";
import { doesOwnSession } from "../middleware/doesOwnSession.js";
import { readLimit, createLimit, updateLimit, deleteLimit } from "../middleware/rateLimits.js";

const router = express.Router();

router.post("/", createLimit, createSession);
router.get("/user/:id", readLimit, requireAuthorization, requireAuthentication, getUserSessionsData);
router.get("/:sessionId", readLimit, requireAuthorization, doesOwnSession, getSessionData);
router.patch("/:sessionId/progress", updateLimit, requireAuthorization, doesOwnSession, updateSession);
router.delete("/:sessionId", deleteLimit, requireAuthorization, doesOwnSession, deleteSession);

export default router;