const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "Email already registered, please login",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie('token', token, { httpOnly: false, secure: process.env.INSECURE_COOKIES !== "true" });
    res.cookie('userId', user._id.toString(), { httpOnly: false, secure: process.env.INSECURE_COOKIES !== "true" });

    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie('token', token, { httpOnly: false, secure: process.env.INSECURE_COOKIES !== "true" });
    res.cookie('userId', user._id.toString(), { httpOnly: false, secure: process.env.INSECURE_COOKIES !== "true" });

    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};

const logoutController = (req, res) => {
  res.clearCookie('token');
  res.clearCookie('userId');
  res.status(200).send({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = { registerController, loginController, logoutController };
