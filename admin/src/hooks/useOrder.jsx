import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { fetchAllOrdersRequest } from "../api/order";

const useOrder = () => {
  const loggedInUser = useSelector((state) => state.admin.admin);
  const [msg, setMsg] = useState("");
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getOrders = async () => {
    setMsg(null);

    try {
      setLoading(true);
      let res = await fetchAllOrdersRequest();
      console.log(res);

      if (res.success) {
        setOrders(res.data);
        setLoading(false);
      } else {
        setMsg(res.response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return { orders, getOrders, loading, msg };
};

export default useOrder;
