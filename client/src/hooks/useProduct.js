import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const useProduct = () => {
  const [msg, setMsg] = useState(null); // error message
  const dispatch = useDispatch(); // dispatch instance
  const navigate = useNavigate(); // navigation instance
  const user = useSelector((state) => state.account.account); // user

  const fetchProduct = async (id) => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API}/product/single/${id}`
      );
      //   setProduct(res.data.data);
      //   setReviews(res.data.data.reviews);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const sendProductReview = async (data) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!data.comment) return;
    try {
      const reviewInfo = {
        user: user.id,
        product: data.id,
        rating: data.rating,
        comment: data.comment,
      };

      let res = await axios.post(
        `${import.meta.env.VITE_API}/product/send-review`,
        reviewInfo,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // setReviews((prev) => [...prev, res.data.data]);
      console.log(res);
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg);
    }
  };

  return { fetchProduct, sendProductReview, msg };
};

export default useProduct;
