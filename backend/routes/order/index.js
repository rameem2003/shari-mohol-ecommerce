const {
  getAllOrders,
  getOrderByID,
  getSingleUserOrder,
  placeOrder,
  responseDeliveryStatus,
  paymentSuccess,
  paymentFail,
  paymentCancel,
} = require("../../controllers/order.controller");
const checkAdminMiddleware = require("../../middlewares/checkAdminMiddleware");
const checkUserMiddleware = require("../../middlewares/checkUserMiddleware");

const router = require("express").Router();

/**
 * Get all orders
 * http://localhost:5000/api/v1/order/all
 */
router.get("/order/all", checkUserMiddleware, getAllOrders);

/**
 * Get order by id
 * http://localhost:5000/api/v1/order/singlebyid/:id
 */
router.get("/order/single/:id", checkUserMiddleware, getOrderByID);

/**
 * Get single user orders
 * http://localhost:5000/api/v1/order/single/:email
 */
router.get("/order", checkUserMiddleware, getSingleUserOrder);

/**
 * Place Order
 * http://localhost:5000/api/v1/order/place
 */
router.post("/order/place", checkUserMiddleware, placeOrder);

/**
 * Response for delivery status
 * http://localhost:5000/api/v1/order/response/:id?statusText
 */
router.patch(
  "/order/response/:id",
  checkAdminMiddleware,
  responseDeliveryStatus
);

/**
 * Order success
 * http://localhost:5000/api/v1/order/success/:orderId
 */
router.post("/order/success/:orderId", paymentSuccess);

/**
 * Order Fail
 * http://localhost:5000/api/v1/order/fail/:orderId
 */
router.post("/order/fail/:orderId", paymentFail);

/**
 * Order Cancel
 * http://localhost:5000/api/v1/order/cancel/:orderId
 */
router.post("/order/cancel/:orderId", paymentCancel);

router.get("/order/get", async (req, res) => {
  try {
    let data = await orderModel.find({}).populate({
      path: "cartItems",
      populate: {
        path: "product",
      },
    });
    res.send(data);
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
});

module.exports = router;
