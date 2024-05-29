const mongoose = require("mongoose");

// Schema
const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Food name is required"],
    },
    price: {
      type: Number,
      required: [true, "Food price is required"],
    },
    category: {
      type: String,
      required: [true, "Food category is required"],
    },
    pictures: {
      type: [String],  // Array of strings for URLs of pictures
    },
    ingredients: {
      type: [String],  // Array of strings for ingredients
      required: [true, "Food ingredients are required"],
    },
  },
  { timestamps: true }
);

// Export
module.exports = mongoose.model("Food", foodSchema);
