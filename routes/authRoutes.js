// backend/routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, country } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name,
      email,
      password: hashedPassword,
      country,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
