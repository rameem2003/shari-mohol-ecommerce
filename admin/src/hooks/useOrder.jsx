import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { fetchAllOrdersRequest } from "../api/order";

const useOrder = () => {
  const loggedInUser = useSelector((state) => state.admin.admin);
  const [msg, setMsg] = useState("");
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [method, setMethod] = useState(searchParams.get("method") || "");
  const [offset, setOffset] = useState(
    parseInt(searchParams.get("offset")) || 1,
  );
  const [paginationData, setPaginationData] = useState(null);
  const navigate = useNavigate();

  const getOrders = async () => {
    const params = new URLSearchParams({
      method,
      status,
      offset,
    });

    setMsg(null);
    try {
      setLoading(true);
      let res = await fetchAllOrdersRequest(params);
      setPaginationData(res);

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
    const params = new URLSearchParams();
    if (method) params.set("method", method);
    if (status) params.set("status", status);
    if (offset) params.set("offset", offset.toString());
    // console.log(params);

    navigate(`/orders?${params.toString()}`);
    getOrders();
  }, [method, status, offset]);

  return {
    orders,
    getOrders,
    loading,
    msg,
    paginationData,
    setOffset,
    setMethod,
    setStatus,
  };
};

export default useOrder;
