import express from "express";
import { getProfile, updateProfile, deleteProfile } from "../controllers/profiles.controller.js";

const router = express.Router();

router.get("/:id", getProfile);
router.patch("/:id", updateProfile);
router.delete("/:id", deleteProfile);

export default router;