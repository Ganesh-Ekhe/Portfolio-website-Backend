import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// ✅ Storage Engine Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ✅ Image "uploads" folder madhe save hoil
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // ✅ Unique filename
  },
});

const upload = multer({ storage });

// ✅ Image Upload Route (POST)
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  const imageUrl = `/uploads/${req.file.filename}`; // ✅ Image path return kela
  res.json({ success: true, imageUrl });
});

export default router;
