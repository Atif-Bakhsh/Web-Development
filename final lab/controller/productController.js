const Product = require("../models/Product");

// CREATE PRODUCT
const createProductController = async (req, res) => {
  try {
    const { name, price, category, pictures, ingredients, isFeatured } = req.body;

    if (!name || !price || !category || !ingredients || isFeatured === undefined) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const newProduct = new Product({ name, price, category, pictures, ingredients, isFeatured });

    await newProduct.save();
    res.status(201).send({
      success: true,
      message: "New Product Item Created",
      newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in create product API",
      error,
    });
  }
};

// GET ALL PRODUCTS
const getAllProductsController = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products.length) {
      return res.status(404).send({
        success: false,
        message: "No products found",
      });
    }
    res.status(200).send({
      success: true,
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in get all products API",
      error,
    });
  }
};

// GET SINGLE PRODUCT
const getSingleProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).send({
        success: false,
        message: "Please provide a product ID",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "No product found with this ID",
      });
    }
    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in get single product API",
      error,
    });
  }
};

// UPDATE PRODUCT
const updateProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).send({
        success: false,
        message: "No product ID was found",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "No product found",
      });
    }
    const { name, price, category, pictures, ingredients, isFeatured } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, category, pictures, ingredients, isFeatured },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Product item was updated",
      updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in update product API",
      error,
    });
  }
};

// DELETE PRODUCT
const deleteProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).send({
        success: false,
        message: "Provide product ID",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "No product found with this ID",
      });
    }
    await Product.findByIdAndDelete(productId);
    res.status(200).send({
      success: true,
      message: "Product item deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in delete product API",
      error,
    });
  }
};

// EXPORT
module.exports = {
  createProductController,
  getAllProductsController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
};