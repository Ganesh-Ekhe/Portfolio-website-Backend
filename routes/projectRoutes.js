import express from "express";
import Project from "../models/projectModel.js"; 

const router = express.Router();

// ✅ Fetch All Projects (GET)
router.get("/", async (req, res) => {  // ✅ Correct route path
    try {
        const projects = await Project.find();
        res.json({ success: true, projects });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ Add New Project (POST)
router.post("/", async (req, res) => {
    try {
        const { title, description, techStack, image, liveLink, githubLink } = req.body;

        const newProject = new Project({
            title,
            description,
            techStack,
            image,  // ✅ Image URL stored here
            liveLink,
            githubLink
        });

        await newProject.save();
        res.status(201).json({ success: true, project: newProject });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ Update Project (PUT)
router.put("/:id", async (req, res) => {
    try {
        const { title, description, techStack, image, liveLink, githubLink } = req.body;

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { title, description, techStack, image, liveLink, githubLink },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        res.json({ success: true, project: updatedProject });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ Delete Project (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        res.json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
