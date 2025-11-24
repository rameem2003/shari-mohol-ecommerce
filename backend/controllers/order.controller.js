const sslcz = require("../helpers/paymentGateway");
const path = require("path");
const {
  findCartItemsByUser,
  removeCartItemById,
} = require("../services/cart.service");
const {
  findAllOrders,
  findOrderById,
  storeOrder,
  findOrderByUser,
  updateDeliveryStatusByOrderId,
  updateOrderStatusByOrderId,
} = require("../services/order.service");
const sendPurchaseConfirmationEmail = require("../utils/sendPurchaseConfirmationEmail");
const {
  orderValidatorSchema,
  orderStatus,
  orderSegmentValidatorSchema,
} = require("../validator/order.validator");

/**
 * Get all orders
 */
const getAllOrders = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unauthorized User" });
  }

  const { data, error } = orderSegmentValidatorSchema.safeParse(req.query);
  if (error) {
    return res
      .status(400)
      .send({ success: false, message: JSON.parse(error.message)[0].message });
  }

  const { offset, method, status } = data;

  try {
    let {
      orders,
      totalCount,
      pendingOrders,
      totalOrders,
      totalRevenue,
      ordersByPayment,
      ordersByStatus,
      dailyRevenue,
      monthlyRevenue,
    } = await findAllOrders((offset - 1) * 10, method, status);

    const totalPages = Math.ceil(totalCount / 10);
    res.status(201).send({
      success: true,
      message: "Order Fetched Success",
      data: orders,
      currentPage: offset,
      totalPages,
      totalCount,
      pendingOrders,
      totalOrders,
      totalRevenue,
      ordersByPayment,
      ordersByStatus,
      dailyRevenue,
      monthlyRevenue,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

/**
 * Get order info by id
 */
const getOrderByID = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unauthorized User" });
  }
  const { id } = req.params;

  try {
    let orders = await findOrderById(id);
    res.status(201).send({
      success: true,
      message: "Order Fetched Success",
      data: orders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

/**
 * Get Orders by single user
 */
const getSingleUserOrder = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unauthorized User" });
  }
  try {
    let allOrders = await findOrderByUser(req.user.id);
    res.status(201).send({
      success: true,
      message: "Single User Order Fetched Success",
      data: allOrders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

/**
 * Get Specific User Order
 */
const getSpecificUserOrder = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unauthorized User" });
  }
  const { id } = req.params;

  try {
    let orders = await findOrderByUser(id);
    res.status(201).send({
      success: true,
      message: "Order Fetched Success",
      data: orders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

/**
 * Place a new Order
 */
const placeOrder = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unauthorized User" });
  }

  let transactionID = Date.now().toString();
  let cartData = await findCartItemsByUser(req.user.id);

  let grandTotal = cartData.reduce((total, cartItem) => {
    const price = cartItem?.item?.discountPrice
      ? cartItem?.item?.discountPrice
      : cartItem?.item?.sellingPrice || 0;
    const quantity = cartItem?.quantity || 0;
    return total + price * quantity;
  }, 0);

  let orderItems = cartData.map((cartItem) => ({
    product: cartItem.item._id.toString(),
    color: cartItem.color || "",
    size: cartItem.size || "",
    quantity: cartItem.quantity,
  }));

  const { data, error } = orderValidatorSchema.safeParse({
    ...req.body,
    userId: req.user.id,
    cartItems: orderItems,
    grandTotal,
    transactionID,
  });

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: JSON.parse(error.message)[0].message });
  }

  try {
    let newOrder = await storeOrder(data);

    cartData.map(async (cartItem) => {
      await removeCartItemById(cartItem._id);
    });
    if (data.paymentMethod === "COD") {
      return res
        .status(302)
        .redirect(
          `${req.protocol}://${req.host}${process.env.BASE_URL}/order/success/${newOrder._id}`
        );
    } else if (data.paymentMethod === "online") {
      const object = {
        total_amount: grandTotal,
        currency: "BDT",
        tran_id: transactionID, // use unique tran_id for each api call
        success_url: `${req.protocol}://${req.host}${process.env.BASE_URL}/order/success/${newOrder._id}`,
        fail_url: `${req.protocol}://${req.host}${process.env.BASE_URL}/order/fail/${newOrder._id}`,
        cancel_url: `${req.protocol}://${req.host}${process.env.BASE_URL}/order/cancel/${newOrder._id}`,
        ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: req.user.name,
        cus_email: req.user.email,
        cus_add1: data.address,
        cus_add2: data.address,
        cus_city: data.city,
        cus_state: data.state,
        cus_postcode: data.postCode,
        cus_country: "Bangladesh",
        cus_phone: data.phone,
        cus_fax: data.phone,
        ship_name: "Customer Name",
        ship_add1: data.address,
        ship_add2: data.address,
        ship_city: data.city,
        ship_state: data.state,
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };

      let apiRes = await sslcz.init(object);
      return res.status(201).send({
        success: true,
        message: "Order Successful",
        data: newOrder,
        url: apiRes.GatewayPageURL,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
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

  const { data, error } = orderStatus.safeParse(statusText);

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: JSON.parse(error.message)[0].message });
  }

  try {
    if (data == "delivered") {
      let order = await updateDeliveryStatusByOrderId(id, data);

      return res.status(200).send({
        success: true,
        message: "Order Delivery Successful",
        data: order,
      });
    } else if (data == "cancelled") {
      let order = await updateDeliveryStatusByOrderId(id, data);

      return res.status(200).send({
        success: true,
        message: "Order Cancelled Successfully",
        data: order,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

/**
 * Success Response
 */
const paymentSuccess = async (req, res) => {
  const { orderId } = req.params;

  let targetOrder = await findOrderById(orderId);

  await sendPurchaseConfirmationEmail(targetOrder);
  let renderFile = path.join(__dirname, "../views/order-confirmation.html");
  res.status(200).sendFile(renderFile);
};

/**
 * Fail Response
 */
const paymentFail = async (req, res) => {
  const { orderId } = req.params;

  await updateOrderStatusByOrderId(orderId);
  res.send("<h1>Payment Failed</h1>");
};

/**
 * Cancel Response
 */
const paymentCancel = async (req, res) => {
  const { orderId } = req.params;

  await updateOrderStatusByOrderId(orderId);
  res.send("<h1>Payment Cancelled</h1>");
};

module.exports = {
  getAllOrders,
  getSingleUserOrder,
  getSpecificUserOrder,
  getOrderByID,
  placeOrder,
  responseDeliveryStatus,
  paymentSuccess,
  paymentFail,
  paymentCancel,
};
