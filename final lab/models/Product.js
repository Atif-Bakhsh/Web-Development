const mongoose = require("mongoose");

// Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
    },
    pictures: {
      type: [String], 
    },
    ingredients: {
      type: [String],  
      required: [true, "Product ingredients are required"],
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
    ,
  },
  { timestamps: true }
);

// Export
module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
