import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Routes
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
const app = express();

// ✅ CORS Configuration (for both local & Vercel frontend)
app.use(cors({
  origin: [
    "http://localhost:5173", // local dev
    "https://portfolio-website-frontend-lusb.vercel.app" // vercel deploy
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Static Folder for Uploads
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
