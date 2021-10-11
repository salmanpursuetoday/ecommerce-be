const Order = require('../../models/Order');


exports.createOrder = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;
    let newOrder = {
      products,
      totalAmount,
      customerId: req.user._id,
    };
    const order = await Order.create(newOrder)
    if (order) return res.status(200).json({ message: "order created successfully", order: true });

  } catch (error) {
    return res.status(500).json({ message: error.message, order: false })
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product').populate('customerId');
    if (orders) return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
