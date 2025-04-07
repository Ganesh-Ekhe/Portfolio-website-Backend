import express from "express";
import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// ✅ Get Admin Profile
router.get("/admin", async (req, res) => {
  try {
    const admin = await Admin.findOne();
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update Admin Profile
router.put("/admin", async (req, res) => {
  try {
    const { name, email, bio, profileImage } = req.body;
    const updatedAdmin = await Admin.findOneAndUpdate({}, { name, email, bio, profileImage }, { new: true });

    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Change Password
router.put("/admin/password", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const admin = await Admin.findOne();

    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect old password" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
