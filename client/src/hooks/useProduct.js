import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BannerReducer } from "../redux/slices/BannerSlice";
import { CategoryReducer } from "../redux/slices/CategorySlice";
import { allProducts } from "../redux/slices/ProductSlice";

const useProduct = () => {
  const [msg, setMsg] = useState(null); // error message
  const [product, setProduct] = useState({}); // state for product
  const [reviews, setReviews] = useState([]); // state for product reviews
  const dispatch = useDispatch(); // dispatch instance
  const navigate = useNavigate(); // navigation instance
  const user = useSelector((state) => state.account.account); // user

  // fetch all banners
  const fetchBanners = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API}/banner/all`);
      dispatch(BannerReducer(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all categories
  const fetchCategories = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API}/category/all`);
      dispatch(CategoryReducer(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all products
  const fetchAllProducts = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API}/product/all`);
      dispatch(allProducts(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProduct = async (id) => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API}/product/single/${id}`
      );
      setProduct(res.data.data);
      let sortedReviews = res.data.data.reviews.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setReviews(sortedReviews);
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
      fetchProduct(data.id); // refresh product to get new reviews
      console.log(res);
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg);
    }
  };

  return {
    fetchBanners,
    fetchCategories,
    fetchAllProducts,
    fetchProduct,
    sendProductReview,
    msg,
    product,
    reviews,
  };
};

export default useProduct;
