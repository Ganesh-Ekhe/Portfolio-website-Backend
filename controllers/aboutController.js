// aboutController.js
import About from "../models/About.js";

export const createAbout = async (req, res) => {
  try {
    const { name, email, phone, description } = req.body;
    const image = req.files["image"]?.[0]?.filename || "";
    const resume = req.files["resume"]?.[0]?.filename || "";

    const about = new About({ name, email, phone, description, image, resume });
    await about.save();

    res.status(201).json(about);
  } catch (error) {
    res.status(500).json({ message: "Error saving About", error });
  }
};

export const getAbouts = async (req, res) => {
  try {
    const data = await About.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching About", error });
  }
};

export const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    await About.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting About", error });
  }
};
