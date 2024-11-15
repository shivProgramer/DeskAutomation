// controllers/adminUserController.js

const AdminUser = require("../models/adminUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const errorMessages = require("../utils/errorMessages");



// Registration ---------------------------------------------------------------------------------
exports.registerUser = async (req, res) => {
  const { username, password, email, phone } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await AdminUser.findOne({ where: { email } });
    if (existingUser) {
      const errorResponse = errorMessages.handleDuplicateEmailError();
      return res
        .status(errorResponse.statusCode)
        .json({ error: errorResponse.message });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await AdminUser.create({
      username,
      password_hash: passwordHash,
      email,
      phone,
      is_active: true,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);

    // Handle specific errors like duplicate email
    if (error.name === "SequelizeUniqueConstraintError") {
      const errorResponse = errorMessages.handleDuplicateEmailError();
      return res
        .status(errorResponse.statusCode)
        .json({ error: errorResponse.message });
    }

    const errorResponse = errorMessages.handleDatabaseError();
    return res
      .status(errorResponse.statusCode)
      .json({ error: errorResponse.message });
  }
};


// Login------------------------------------------------------------------------------------------
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await AdminUser.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }
    // Generate JWT
    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token , userData:user });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ error: "An error occurred during login." });
  }
};

// Fetch all users (for testing purposes)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await AdminUser.findAll();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
};
