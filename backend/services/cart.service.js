const cartModel = require("../model/cart.model");

const findCartItemsByUser = async (userId) => {
  try {
    let cartItems = await cartModel.find({ userId }).populate("item");
    return cartItems;
  } catch (error) {
    throw new Error("Error finding cart items: " + error.message);
  }
};

const findCartById = async (cartId) => {
  try {
    let cartItem = await cartModel.findOne({ _id: cartId }).populate("item");
    return cartItem;
  } catch (error) {
    throw new Error("Error finding cart item: " + error.message);
  }
};

const findSingleCartItem = async (userId, item) => {
  try {
    let cartItem = await cartModel.findOne({ userId, item });
    return cartItem;
  } catch (error) {
    throw new Error("Error finding cart item: " + error.message);
  }
};

const removeCartItemById = async (cartItemId) => {
  try {
    await cartModel.findByIdAndDelete(cartItemId);
  } catch (error) {
    throw new Error("Error removing cart item: " + error.message);
  }
};

module.exports = {
  findCartItemsByUser,
  findCartById,
  findSingleCartItem,
  removeCartItemById,
};
