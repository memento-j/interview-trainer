import express from "express";
import { getProfile, updateProfile, deleteProfile } from "../controllers/profiles.controller.js";
import { requireAuthorization } from "../middleware/requireAuthorization.js";
import { requireAuthentication } from "../middleware/requireAuthentication.js";
import { readLimit, updateLimit, deleteLimit } from "../middleware/rateLimits.js";

const router = express.Router();

router.use(requireAuthorization);
router.get("/:id", readLimit, requireAuthentication, getProfile);
router.patch("/:id", updateLimit, requireAuthentication, updateProfile);
router.delete("/:id", deleteLimit, requireAuthentication, deleteProfile);

export default router;