const express = require("express");
const {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
  getUserOrdersController, // Ensure this controller is imported
  getOrdersController,
} = require("../controller/foodController");
const authMiddleware = require("../middlewares/authMiddle");
const adminMiddleware = require("../middlewares/adminMiddle");

const router = express.Router();

// CREATE FOOD
router.post("/create", authMiddleware, createFoodController);

// GET ALL FOOD
router.get("/getAll", getAllFoodsController);

// GET SINGLE FOOD
router.get("/get/:id", getSingleFoodController);

// GET FOOD BY RESTAURANT
router.get("/getByResturant/:id", getFoodByResturantController);

// UPDATE FOOD
router.put("/update/:id", authMiddleware, updateFoodController);

// DELETE FOOD
router.delete("/delete/:id", authMiddleware, deleteFoodController);

// PLACE ORDER
router.post("/placeorder", authMiddleware, placeOrderController);

// ORDER STATUS
router.post("/orderStatus/:id", authMiddleware, adminMiddleware, orderStatusController);

// GET USER ORDERS
router.get("/order/getUserOrders", authMiddleware, getUserOrdersController); // Ensure this route is defined correctly

// GET ALL ORDERS
router.get("/order/getOrders", authMiddleware, adminMiddleware, getOrdersController);

module.exports = router;
