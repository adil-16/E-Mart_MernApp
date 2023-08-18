const Order = require("../models/Orders");
const User = require('../models/User');

module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};


module.exports.addOrder = async (req, res) => {

  const { items, totalAmount, user } = req.body;
  
  const user_ = await User.findOne({ username: user });
    try {
      if (!user_) {
        return res.status(400).json({ message: 'User not found' });
    }
        const order = new Order({
            items,
            totalAmount,
            user: user_._id,
        });

        const savedOrder = await order.save();
        res.json(savedOrder);
        console.log("Added Successfully...");
    
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
}

module.exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedOrder = await Order.findByIdAndDelete(id);
  
      if (deletedOrder) {
        res.status(200).json({ message: "Order deleted successfully" });
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };



