import express from "express";
import { createSession, getSessionData, getUserSessionsData, updateSession, deleteSession} from "../controllers/sessions.controller.js";
import { requireAuthorization } from "../middleware/requireAuthorization.js";
import { requireAuthentication } from "../middleware/requireAuthentication.js";
import { doesOwnSession } from "../middleware/doesOwnSession.js";
import { readLimit, createLimit, updateLimit, deleteLimit } from "../middleware/rateLimits.js";

const router = express.Router();

router.use(requireAuthorization);
router.post("/", createLimit, createSession);
router.get("/user/:id", readLimit, requireAuthentication, getUserSessionsData);
router.get("/:sessionId", readLimit, doesOwnSession, getSessionData);
router.patch("/:sessionId/progress", updateLimit, doesOwnSession, updateSession);
router.delete("/:sessionId", deleteLimit, doesOwnSession, deleteSession);

export default router;