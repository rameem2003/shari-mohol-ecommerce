import axios from "axios";
import { useState } from "react";

const useCheckout = () => {
  const [msg, setMsg] = useState(null); // error message
  // function for checkout
  const checkout = async (data) => {
    console.log(data);

    let orderData = {
      name: data.name,
      email: data.email,
      address: data.address,
      city: data.city,
      postCode: data.postCode,
      phone: data.phone,
      cartItems: data.cartItems.map((item, i) => ({
        product: item._id,
        // color: item.color,
        // size: item.size,
        quantity: item.quantity,
      })),
      grandTotal: data.grandTotal,
      paymentMethod: data.paymentMethod,
    };

    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/order/place`,
        orderData,
        { withCredentials: true }
      );

      console.log(res);
      setMsg(null);
      location.replace(res.data.url);
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg);
    }
  };

  return { checkout, msg };
};

export default useCheckout;
