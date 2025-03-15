const sslcz = require("../helpers/paymentGateway");
const orderModel = require("../model/order.model");

/**
 * Get all orders
 */
const getAllOrders = async (req, res) => {
  try {
    let allOrders = await orderModel.find().populate({
      path: "cartItems",
      populate: {
        path: "product",
      },
    });
    res.status(201).send({
      success: true,
      msg: "Order Fetched Success",
      data: allOrders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Get order info by id
 */
const getOrderByID = async (req, res) => {
  const { id } = req.params;

  try {
    let orders = await orderModel.findOne({ _id: id }).populate({
      path: "cartItems",
      populate: {
        path: "product",
      },
    });
    res.status(201).send({
      success: true,
      msg: "Order Fetched Success",
      data: orders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Get Orders by single user
 */
const getSingleUserOrder = async (req, res) => {
  const { email } = req.params;
  try {
    let allOrders = await orderModel.find({ email }).populate({
      path: "cartItems",
      populate: {
        path: "product",
      },
    });
    res.status(201).send({
      success: true,
      msg: "Single User Order Fetched Success",
      data: allOrders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Place a new Order
 */
const placeOrder = async (req, res) => {
  const {
    name,
    email,
    address,
    city,
    postCode,
    phone,
    cartItems,
    grandTotal,
    paymentMethod,
  } = req.body;

  try {
    if (city && phone && address && email) {
      let transactionID = Date.now();
      let order = new orderModel({
        name,
        email,
        address,
        city,
        postCode,
        phone,
        cartItems,
        grandTotal,
        transactionID,
        paymentMethod,
      });

      await order.save();

      const data = {
        total_amount: grandTotal,
        currency: "BDT",
        tran_id: transactionID, // use unique tran_id for each api call
        success_url: `${process.env.HOST_URL}${process.env.PORT}${process.env.BASE_URL}/order/success/${order._id}`,
        fail_url: `${process.env.HOST_URL}${process.env.PORT}${process.env.BASE_URL}/order/fail/${order._id}`,
        cancel_url: `${process.env.HOST_URL}${process.env.PORT}${process.env.BASE_URL}/order/cancel/${order._id}`,
        ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: name,
        cus_email: email,
        cus_add1: address,
        cus_add2: address,
        cus_city: city,
        cus_state: city,
        cus_postcode: postCode,
        cus_country: "Bangladesh",
        cus_phone: phone,
        cus_fax: phone,
        ship_name: "Customer Name",
        ship_add1: address,
        ship_add2: address,
        ship_city: city,
        ship_state: city,
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };

      if (paymentMethod == "COD") {
        order.paymentStatus = "COD";
        await order.save();

        // cartItems.map(async (item) => {
        //   await cartModel.findOneAndDelete({ _id: item.cartId });
        // });
        return res.status(201).send({
          success: true,
          msg: "Order Successful",
          data: order,
          url: `http://localhost:5173/payment/success/${order._id}`,
        });
      } else if (paymentMethod == "online") {
        let apiRes = await sslcz.init(data);
        return res.status(201).send({
          success: true,
          msg: "Order Successful",
          data: order,
          url: apiRes.GatewayPageURL,
        });
      }
    } else {
      res.status(404).send({
        success: false,
        msg: "Some Information Needed",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Response for delivery status
 */
const responseDeliveryStatus = async (req, res) => {
  let { id } = req.params;
  let { statusText } = req.query;

  try {
    if (statusText == "delivered") {
      let order = await orderModel.findByIdAndUpdate(
        { _id: id },
        { deliveryStatus: statusText },
        { new: true }
      );

      return res.status(200).send({
        success: true,
        msg: "Order Delivery Successful",
        data: order,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Success Response
 */
const paymentSuccess = async (req, res) => {
  const { orderId } = req.params;

  let targetOrder = await orderModel.findByIdAndUpdate(
    { _id: orderId },
    { paymentStatus: "paid" },
    { new: true }
  );

  //   targetOrder.cartItems.map(async (item) => {
  //     await cartModel.findOneAndDelete({ _id: item.cartId });
  //   });

  return res.redirect(`http://localhost:5173/payment/success/${orderId}`);
};

/**
 * Fail Response
 */
const paymentFail = async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);

  await orderModel.findByIdAndDelete({ _id: orderId });

  return res.redirect(`http://localhost:5173/payment/fail/${orderId}`);
};

/**
 * Cancel Response
 */
const paymentCancel = async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);

  await orderModel.findByIdAndDelete({ _id: orderId });

  return res.redirect(`http://localhost:5173/payment/cancel/${orderId}`);
};

module.exports = {
  getAllOrders,
  getSingleUserOrder,
  getOrderByID,
  placeOrder,
  responseDeliveryStatus,
  paymentSuccess,
  paymentFail,
  paymentCancel,
};
