// backend/routes/projectRoutes.js
import express from "express";
import Project from "../models/Project.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create Project
router.post("/", authMiddleware, async (req, res) => {
  try {
    const projectCount = await Project.countDocuments({ userId: req.userId });

    if (projectCount >= 4) {
      return res.status(400).json({ message: "Maximum 4 projects allowed per user." });
    }

    const project = await Project.create({
      name: req.body.name,
      userId: req.userId,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get All Projects
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.userId });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
