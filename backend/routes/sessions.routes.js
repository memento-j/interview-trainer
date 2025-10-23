import express from "express";
import { createSession, getSessionData, getUserSessionsData, updateSession, deleteSession} from "../controllers/sessions.controller.js";
import { requireAuthorization } from "../middleware/requireAuthorization.js";
import { requireAuthentication } from "../middleware/requireAuthentication.js";
import { doesOwnSession } from "../middleware/doesOwnSession.js";

const router = express.Router();

router.use(requireAuthorization);
router.post("/", createSession);
router.get("/user/:id", requireAuthentication, getUserSessionsData);
router.get("/:sessionId", doesOwnSession, getSessionData);
router.patch("/:sessionId/progress", doesOwnSession, updateSession);
router.delete("/:sessionId", doesOwnSession, deleteSession);

export default router;