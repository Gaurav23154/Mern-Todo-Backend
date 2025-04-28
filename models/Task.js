// backend/models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
});

export default mongoose.model("Task", taskSchema);
