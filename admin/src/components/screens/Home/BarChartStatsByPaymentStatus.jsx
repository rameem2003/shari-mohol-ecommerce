import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { fetchAllOrdersRequest } from "../../../api/order";
import Skeleton from "react-loading-skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  scales: {
    x: {
      ticks: { color: "white" },
    },
    y: {
      ticks: { color: "white" },
    },
  },
  responsive: true,
  plugins: {
    legend: { position: "top", labels: { color: "white" } },
    title: {
      display: true,
      text: "Order Count by Payment Status",
      color: "white",
    },
  },
};

const BarChartStatsByPaymentStatus = () => {
  const [chartData, setChartData] = useState(null);
  const fetchOrders = async () => {
    let res = await fetchAllOrdersRequest();
    // console.log(res);

    const data = res.ordersByPayment; // <-- MATCHES YOUR RESPONSE

    const labels = data.map((item) => item._id.toUpperCase());
    const count = data.map((item) => item.orderCount);
    const revenue = data.map((item) => item.totalRevenue);

    setChartData({
      labels,
      datasets: [
        {
          label: "Order Count",
          color: "white",
          data: count,
          backgroundColor: "blue",
        },
        {
          label: "Total Revenue",
          color: "white",
          data: revenue,
          backgroundColor: "green",
        },
      ],
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="relative w-full rounded-md bg-gray-100 p-2 lg:w-[48%] dark:bg-slate-800">
      <h2 className="text-2xl font-bold text-black dark:text-white">
        Order Count by Payment Status
      </h2>

      {!chartData && (
        <Skeleton
          baseColor="#0F172A"
          highlightColor="#ddd"
          count={1}
          height={250}
          className="mb-1 w-full rounded-md"
        />
      )}
      {chartData && <Bar options={options} data={chartData} />}
    </div>
  );
};

export default BarChartStatsByPaymentStatus;
