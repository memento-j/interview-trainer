import express from "express";
import { getProfile, updateProfile, deleteProfile } from "../controllers/profiles.controller.js";
import { requireAuthorization } from "../middleware/requireAuthorization.js";
import { requireAuthentication } from "../middleware/requireAuthentication.js";

const router = express.Router();

router.use(requireAuthorization);
router.get("/:id", requireAuthentication, getProfile);
router.patch("/:id", requireAuthentication, updateProfile);
router.delete("/:id", requireAuthentication, deleteProfile);

export default router;