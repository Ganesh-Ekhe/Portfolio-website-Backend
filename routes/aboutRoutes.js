// routes/aboutRoutes.js
import express from "express";
import upload from "../middleware/upload.js";
import { createAbout, getAbouts, deleteAbout } from "../controllers/aboutController.js";

const router = express.Router();

router.get("/", getAbouts);

router.post("/", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "resume", maxCount: 1 }
]), createAbout);

router.delete("/:id", deleteAbout);

export default router; // ✅
