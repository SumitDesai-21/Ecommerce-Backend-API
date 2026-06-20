import { Order } from "../models/Order.js";

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({
      user: userId,
    }).populate("items.product");

    let totalAmount = 0;

    cart.items.forEach((item) => {
      totalAmount += item.product.price * item.quantity;
    });

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const order = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
    });

    cart.items = [];
    await cart.save();

    return res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {}
};

const getOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({
      user: userId,
    });

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "orders doesn't exist",
      });
    }

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export { placeOrder, getOrders };