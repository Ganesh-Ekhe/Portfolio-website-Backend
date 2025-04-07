// models/Skill.js
import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
    category: { type: String },
    level: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", SkillSchema);
