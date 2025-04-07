import express from "express";
import Skill from "../models/Skills.js";

const router = express.Router();

// ✅ GET all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch skills", error: err.message });
  }
});

// ✅ POST - Add new skill
router.post("/", async (req, res) => {
  const { title, percentage } = req.body;

  if (!title || !percentage) {
    return res.status(400).json({ message: "Title and percentage are required" });
  }

  try {
    const newSkill = new Skill({ title, percentage });
    await newSkill.save();
    res.status(201).json({ message: "Skill created", skill: newSkill });
  } catch (err) {
    res.status(500).json({ message: "Failed to create skill", error: err.message });
  }
});

// ✅ PUT - Update skill
router.put("/:id", async (req, res) => {
  const { title, percentage } = req.body;

  try {
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      { title, percentage },
      { new: true }
    );
    res.status(200).json({ message: "Skill updated", skill: updatedSkill });
  } catch (err) {
    res.status(500).json({ message: "Failed to update skill", error: err.message });
  }
});

// ✅ DELETE - Delete skill
router.delete("/:id", async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete skill", error: err.message });
  }
});

export default router;
