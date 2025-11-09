const {
  getAllOrders,
  getOrderByID,
  getSingleUserOrder,
  placeOrder,
  responseDeliveryStatus,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  getSpecificUserOrder,
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
 * Get Logged in user orders
 * http://localhost:5000/api/v1/order
 */
router.get("/order", checkUserMiddleware, getSingleUserOrder);

/**
 * Get Logged in user orders
 * http://localhost:5000/api/v1/order/user/:id
 */
router.get("/order/user/:id", checkAdminMiddleware, getSpecificUserOrder);

/**
 * Get order by id
 * http://localhost:5000/api/v1/order/singlebyid/:id
 */
router.get("/order/single/:id", checkUserMiddleware, getOrderByID);

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

module.exports = router;
