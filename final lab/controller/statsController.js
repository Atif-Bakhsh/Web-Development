const Order = require("../models/Order");
const Food = require("../models/Food");
const User = require("../models/User");

const getStatsController = async (req, res) => {
  try {
    const totalRevenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$payment" } } }]);
    const totalOrdersDone = await Order.countDocuments({ status: "completed" });
    const totalClients = await User.countDocuments({ userType: "client" });
    const totalProducts = await Food.countDocuments({});
    const totalOrdersPending = await Order.countDocuments({ status: "pending" });

    res.status(200).send({
      success: true,
      stats: {
        totalRevenue: totalRevenue[0]?.total || 0,
        totalOrdersDone,
        totalClients,
        totalProducts,
        totalOrdersPending
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching stats",
      error,
    });
  }
};

module.exports = { getStatsController };
