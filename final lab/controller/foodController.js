const Food = require("../models/Food");
const Order = require("../models/Order");
const JWT = require("jsonwebtoken");

// CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const { name, price, category, pictures, ingredients } = req.body;

    if (!name || !price || !category || !ingredients) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const newFood = new Food({ name, price, category, pictures, ingredients });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in create food API",
      error,
    });
  }
};

// GET ALL FOODS
const getAllFoodsController = async (req, res) => {
  try {
    const foods = await Food.find({});
    if (!foods.length) {
      return res.status(404).send({
        success: false,
        message: "No food items found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in get all foods API",
      error,
    });
  }
};

// GET SINGLE FOOD
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(400).send({
        success: false,
        message: "Please provide a food ID",
      });
    }
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with this ID",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in get single food API",
      error,
    });
  }
};

// GET FOOD BY RESTAURANT
const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(400).send({
        success: false,
        message: "Please provide a restaurant ID",
      });
    }
    const food = await Food.find({ restaurant: resturantId });
    if (!food.length) {
      return res.status(404).send({
        success: false,
        message: "No food found for this restaurant",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food items by restaurant",
      food,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in get food by restaurant API",
      error,
    });
  }
};

// UPDATE FOOD ITEM
const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(400).send({
        success: false,
        message: "No food ID was found",
      });
    }
    const food = await Food.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found",
      });
    }
    const { name, price, category, pictures, ingredients } = req.body;
    const updatedFood = await Food.findByIdAndUpdate(
      foodID,
      { name, price, category, pictures, ingredients },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food item was updated",
      updatedFood,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in update food API",
      error,
    });
  }
};

// DELETE FOOD
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(400).send({
        success: false,
        message: "Provide food ID",
      });
    }
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with this ID",
      });
    }
    await Food.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food item deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in delete food API",
      error,
    });
  }
};

// PLACE ORDER
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!cart || !cart.length) {
      return res.status(400).send({
        success: false,
        message: "Cart is empty",
      });
    }

    const newOrder = new Order({
      foods: cart,
      payment: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      buyer: userId,
    });

    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in place order API",
      error,
    });
  }
};

// CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid order ID",
      });
    }
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.status(200).send({
      success: true,
      message: "Order status updated",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in order status API",
      error,
    });
  }
};

// GET USER ORDERS
const getUserOrdersController = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const orders = await Order.find({ buyer: userId }).populate('foods');
    if (!orders.length) {
      return res.status(404).send({
        success: false,
        message: "No orders found for this user",
      });
    }

    res.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in get user orders API",
      error,
    });
  }
};

// GET ALL ORDERS
const getOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('foods').populate('buyer');
    if (!orders.length) {
      return res.status(404).send({
        success: false,
        message: "No orders found",
      });
    }
    res.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in get orders API",
      error,
    });
  }
}

module.exports = {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
  getUserOrdersController,
  getOrdersController,
};
