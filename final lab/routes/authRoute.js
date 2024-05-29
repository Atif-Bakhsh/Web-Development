const express = require("express");
const { registerController } = require("../controller/authController");
const { loginController } = require("../controller/authController");
const { logoutController } = require("../controller/authController");

const router = express.Router();

// ROUTERS
// Register || post 
router.post("/register", registerController);
// Login || post
router.post("/login", loginController);
// Logout || post 
router.post("/logout", logoutController);

module.exports = router;