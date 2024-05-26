const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, userType, profileImage, answer } = req.body;

    // Validate required fields
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered, please login" });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      userType: userType || 'client',  // Default to 'client' if not provided
      profileImage,
      answer
    });

    // Save the user
    await user.save();

    res.status(201).json({
      success: true,
      message: "Successfully Registered",
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Register API",
      error
    });
  }
};

// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    // Remove password from response
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "Login successfully",
      token,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Login API",
      error
    });
  }
};

module.exports = { registerController, loginController };
