const express = require("express");
const {
  createProductController,
  getAllProductsController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
} = require("../controller/productController");
const authMiddleware = require("../middlewares/authMiddle");
const adminMiddleware = require("../middlewares/adminMiddle");

const router = express.Router();

// CREATE PRODUCT
router.post("/create", authMiddleware, adminMiddleware, createProductController);

// GET ALL PRODUCTS
router.get("/getAll", authMiddleware, adminMiddleware, getAllProductsController);

// GET SINGLE PRODUCT
router.get("/get/:id", authMiddleware, getSingleProductController);

// UPDATE PRODUCT
router.put("/update/:id", authMiddleware, adminMiddleware, updateProductController);

// DELETE PRODUCT
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteProductController);

module.exports = router;
