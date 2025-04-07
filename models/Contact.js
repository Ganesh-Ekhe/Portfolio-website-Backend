import express from "express";
import Contact from "../models/contactModel.js"; // Make sure this model exists

const router = express.Router();

// POST request to handle contact form submission
router.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Save data in MongoDB
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.status(201).json({ success: true, message: "Message received!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
