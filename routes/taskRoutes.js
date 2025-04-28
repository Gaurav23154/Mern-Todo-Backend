// backend/routes/taskRoutes.js
import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create Task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, status, projectId } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      projectId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get Tasks for a Project
router.get("/:projectId", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Update a Task
router.put("/:taskId", authMiddleware, async (req, res) => {
  try {
    const { title, description, status, completedAt } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { title, description, status, completedAt },
      { new: true }
    );

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Delete a Task
router.delete("/:taskId", authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
