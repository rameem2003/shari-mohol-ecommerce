import React from "react";
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
import { useState } from "react";
import { fetchAllOrdersRequest } from "../../../api/order";
import { useEffect } from "react";
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
    title: { display: true, text: "Monthly Revenue", color: "white" },
  },
  //   color: { white: "white" },
};

const BarChartMonthlyRevenue = () => {
  const [chartData, setChartData] = useState(null);

  const fetchOrders = async () => {
    let res = await fetchAllOrdersRequest();
    // console.log(res);

    const data = res.monthlyRevenue; // <-- MATCHES YOUR RESPONSE

    // Convert month numbers → month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const labels = data.map(
      (item) => `${monthNames[item._id.month]} ${item._id.year}`,
    );
    const revenue = data.map((item) => item.revenue);

    setChartData({
      labels,
      datasets: [
        {
          label: "Revenue (BDT)",
          color: "white",
          data: revenue,
          backgroundColor: "orange",
        },
      ],
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  //   if (!chartData) {
  //     return (
  //       <section>
  //         <Skeleton
  //           baseColor="#202020"
  //           highlightColor="#ddd"
  //           count={1}
  //           height={250}
  //           className="mb-1 w-full rounded-md"
  //         />
  //       </section>
  //     );
  //   }

  return (
    <div className="relative w-full rounded-md bg-gray-100 p-2 dark:bg-slate-800">
      <h2 className="text-2xl font-bold text-black dark:text-white">
        Monthly Revenue
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

export default BarChartMonthlyRevenue;
