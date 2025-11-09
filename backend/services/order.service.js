const orderModel = require("../model/order.model");

const findAllOrders = async () => {
  try {
    let orders = await orderModel
      .find()
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
