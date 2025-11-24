const orderModel = require("../model/order.model");

const findAllOrders = async (offset = 1, method = "", status = "") => {
  try {
    let orders = await orderModel
      .find({
        ...(method && { paymentMethod: method }),
        ...(status && { deliveryStatus: status }),
      })
      .populate({
        path: "cartItems",
        populate: {
          path: "product",
        },
      })
      .populate("userId")
      .limit(10)
      .skip(offset)
      .sort({ createdAt: -1 });

    let pendingOrders = orders.filter(
      (order) => order.deliveryStatus === "Pending"
    );
    // console.log("Pending Orders:", pendingOrders);

    let totalOrders = await orderModel.countDocuments();
    let totalRevenue = await orderModel.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$grandTotal",
          },
        },
      },
    ]);

    const ordersByPayment = await orderModel.aggregate([
      {
        $group: {
          _id: "$paymentMethod", // online / cod
          totalRevenue: { $sum: "$grandTotal" },
          orderCount: { $sum: 1 },
        },
      },
    ]);

    const ordersByStatus = await orderModel.aggregate([
      {
        $group: {
          _id: "$deliveryStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    const dailyRevenue = await orderModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          revenue: { $sum: "$grandTotal" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    const monthlyRevenueAllMonths = await orderModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$grandTotal" },
          orderCount: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    // --- GENERATE FULL YEAR MONTHS ---
    const currentYear = new Date().getFullYear();

    const fullYearMonths = Array.from({ length: 12 }, (_, i) => ({
      _id: { year: currentYear, month: i },
      revenue: 0,
      orderCount: 0,
    }));

    // --- MERGE RESULTS INTO FULL 12 MONTHS ---
    const merged = fullYearMonths.map((month) => {
      const found = monthlyRevenueAllMonths.find(
        (item) =>
          item._id.year === month._id.year && item._id.month === month._id.month
      );

      return found ? found : month; // keep zero-filled data
    });

    // Force include both methods (even if no data)
    const paymentMethods = ["online", "cod"];

    const allOrdersByPaymentStatus = paymentMethods.map((method) => {
      const found = ordersByPayment.find((r) => r._id === method);

      return found
        ? found
        : {
            _id: method,
            totalRevenue: 0,
            orderCount: 0,
          };
    });

    return {
      orders,
      pendingOrders,
      totalOrders,
      totalCount: totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      ordersByPayment: allOrdersByPaymentStatus,
      ordersByStatus,
      dailyRevenue,
      monthlyRevenue: merged,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error finding orders: " + error.message);
  }
};

const findOrderById = async (id) => {
  try {
    let order = await orderModel
      .findOne({ _id: id })
      .populate({
        path: "cartItems",
        populate: {
          path: "product",
        },
      })
      .populate("userId");
    return order;
  } catch (error) {
    console.log(error);
    throw new Error("Error finding order: " + error.message);
  }
};

const findOrderByUser = async (userId) => {
  try {
    let orders = await orderModel
      .find({ userId })
      .populate({
        path: "cartItems",
        populate: {
          path: "product",
        },
      })
      .populate("userId")
      .sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    console.log(error);
    throw new Error("Error finding orders: " + error.message);
  }
};

const storeOrder = async (orderData) => {
  try {
    let newOrder = new orderModel(orderData);
    let savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    console.log(error);
    throw new Error("Error saving order: " + error.message);
  }
};

const updateDeliveryStatusByOrderId = async (orderId, status) => {
  try {
    let order = await orderModel.findOneAndUpdate(
      { _id: orderId },
      { deliveryStatus: status },
      { new: true }
    );
    return order;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating order: " + error.message);
  }
};

const updateOrderStatusByOrderId = async (orderId) => {
  try {
    let order = await orderModel.findOneAndUpdate(
      { _id: orderId },
      { orderIsCancelled: true },
      { new: true }
    );
    return order;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating order: " + error.message);
  }
};

module.exports = {
  findAllOrders,
  findOrderById,
  findOrderByUser,
  updateOrderStatusByOrderId,
  updateDeliveryStatusByOrderId,
  storeOrder,
};
