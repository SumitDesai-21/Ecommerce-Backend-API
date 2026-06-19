import { Product } from "../models/Product.js";

const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    if (!name || price === undefined || !category || stock === undefined) {
      return res.json({ success: false, message: "All fields are required" });
    }
    if (price < 0 || stock < 0) {
      return res.json({ success: false, message: "Invalid data added" });
    }
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
    });
    await newProduct.save();

    return res.status(201).json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product doesn't exist" });
    }
    return res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updatedProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, description, category, stock } = req.body;
    if (!name || price === undefined || !category || stock === undefined) {
      return res.json({ success: false, message: "All fields are required" });
    }
    if (price < 0 || stock < 0) {
      return res.json({ success: false, message: "Invalid data added" });
    }
    await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        category,
        stock,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return res.json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createProduct,
  getProductById,
  getAllProducts,
  updatedProduct,
  deleteProduct,
};
