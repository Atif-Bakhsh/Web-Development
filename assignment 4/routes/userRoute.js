const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
  getAllUsersController, 
} = require("../controller/userContoller");
const authMiddleware = require("../middlewares/authMiddle");

const router = express.Router();

//routes
// GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

// UPDATE PROFILE
router.put("/updateUser", authMiddleware, updateUserController);

//password update
router.post("/updatePassword", authMiddleware, updatePasswordController);

// RESET PASSWORD (not working)
router.post("/resetPassword", authMiddleware, resetPasswordController);

// delete USER (not working)
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

// GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

// GET ALL USERS || GET
router.get("/getAllUsers", authMiddleware, getAllUsersController);

module.exports = router;