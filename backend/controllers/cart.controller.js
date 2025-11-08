const cartModel = require("../model/cart.model");
const {
  findCartItemsByUser,
  findSingleCartItem,
  removeCartItemById,
  findCartById,
} = require("../services/cart.service");

const viewCart = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unauthorized User" });
  }
  try {
    let userCart = await findCartItemsByUser(req.user.id);

    userCart.map((cartItem) => {
      console.log(cartItem.item.sellingPrice);
    });

    let grandTotal = userCart.reduce((total, cartItem) => {
      const price = cartItem?.item?.discountPrice
        ? cartItem?.item?.discountPrice
        : cartItem?.item?.sellingPrice || 0;
      const quantity = cartItem?.quantity || 0;
      return total + price * quantity;
    }, 0);

    return res.status(200).send({
      success: true,
      message: "Cart Items",
      data: userCart,
      grandTotal,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const addToCart = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unauthorized User" });
  }

  let { item } = req.params;

  try {
    let existCart = await findSingleCartItem(req.user.id, item);

    if (!existCart) {
      let newCart = cartModel({ userId: req.user.id, item });
      await newCart.save();

      return res.status(201).send({
        success: true,
        message: "Item Added to Cart",
        data: newCart,
      });
    } else {
      existCart.quantity++;
      existCart.save();

      return res.status(201).send({
        success: true,
        message: "Item quantity increment to Cart",
        data: existCart,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const decrementCartQuantity = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unauthorized User" });
  }

  let { id } = req.params;

  try {
    let existCart = await findCartById(id);
    console.log(existCart);

    if (existCart) {
      existCart.quantity--;
      existCart.save();

      return res.status(201).send({
        success: true,
        message: "Item quantity decremented in Cart",
        data: existCart,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Item not found in Cart",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const removeItem = async (req, res) => {
  if (!req.user) {
    return res
      .status(404)
      .send({ success: false, message: "Unauthorized User" });
  }

  let { id } = req.params;

  try {
    let targetCart = await removeCartItemById(id);
    res.status(200).send({
      success: true,
      message: "Item Deleted",
      data: targetCart,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { viewCart, addToCart, decrementCartQuantity, removeItem };
