const {
  addToCart,
  viewCart,
  removeItem,
  decrementCartQuantity,
} = require("../../controllers/cart.controller");
const checkAdminMiddleware = require("../../middlewares/checkAdminMiddleware");

const router = require("express").Router();

/**
 * Cart Route
 * http://localhost:5000/api/v1/cart
 */
router.get("/cart", checkAdminMiddleware, viewCart);

/**
 * Add to Cart Route
 * http://localhost:5000/api/v1/cart/add/:item
 */
router.post("/cart/add/:item", checkAdminMiddleware, addToCart);

/**
 * Decrement Cart Quantity Route
 * http://localhost:5000/api/v1/cart/decrement/:id
 */
router.put("/cart/decrement/:id", checkAdminMiddleware, decrementCartQuantity);

/**
 * Remove Item from Cart Route
 * http://localhost:5000/api/v1/cart/delete/:id
 */
router.delete("/cart/delete/:id", checkAdminMiddleware, removeItem);

module.exports = router;
