const Order = require("./order.model");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body); // ✅ fixed
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

// Get orders by email
const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const orders = await Order.find({ email })
      .populate("items.product", "title newPrice coverImage") // 👈 populate key book fields
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this email" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderByEmail,
};
