import { useDispatch } from "react-redux";
import {
  cartClear,
  cartReducer,
  removeProduct,
  updateQuntity,
} from "../redux/slices/CartSlice";

const useCart = () => {
  const dispatch = useDispatch(); // dispatch instance

  // function for add to cart
  const addToCart = (item) => {
    dispatch(cartReducer({ ...item, quantity: 1 }));
  };

  // function for update quantity
  const updateCart = (id, n) => {
    dispatch(updateQuntity({ id, n }));
  };

  // remove product from cart
  const removeProductCart = (id) => {
    dispatch(removeProduct(id));
  };

  // clear cart
  const productCartClear = () => {
    dispatch(cartClear());
  };

  return { addToCart, updateCart, removeProductCart, productCartClear };
};

export default useCart;
