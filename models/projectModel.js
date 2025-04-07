import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: { type: String, required: true },
  image: { type: String, required: true }, // ✅ Image Path Store Hoil
  liveLink: { type: String },
  githubLink: { type: String },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
