import axios from "axios";
import React, { useEffect, useState } from "react";

const PieChart = () => {
  const [orders, setOrders] = useState([]); // set the initial state of orders

  // fetch the orders from the backend
  const fetchOrders = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API}/order/all`);
      setOrders(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let completeOrder = orders?.filter(
    (item) => item.deliveryStatus == "delivered",
  );
  let pendingOrder = orders?.filter((item) => item.deliveryStatus == "pending");
  let cancelOrder = orders?.filter((item) => item.deliveryStatus == "cancel");

  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  const data = [
    { name: "Order Complete", value: completeOrder?.length },
    { name: "Order Pending", value: pendingOrder?.length },
    { name: "Order Cancel", value: cancelOrder?.length },
  ];

  const width = windowSize.width < 376 ? 250 : 400;
  const height = windowSize.width < 376 ? 250 : 400;
  const colors = [
    "#4b77be",
    "#f5ab35",
    "#e74c3c",
    "#96c0ce",
    "#2ecc71",
    "#c39bd3",
  ];

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg border p-4">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + (Number(item.value) || 0), 0);

  if (total === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg border p-4">
        <p className="text-gray-500">Invalid data values</p>
      </div>
    );
  }

  const innerRadius = 0.5;
  const radius = Math.min(width, height) / 3;
  const centerX = width / 2;
  const centerY = height / 2;

  // Calculate donut slices
  let startAngle = 0;
  const slices = data.map((item, index) => {
    const value = Number(item.value) || 0;
    const percentage = (value / total) * 100;
    const angle = (percentage / 100) * 2 * Math.PI;

    // Calculate SVG arc path
    const endAngle = startAngle + angle;
    const outerX1 = centerX + radius * Math.cos(startAngle);
    const outerY1 = centerY + radius * Math.sin(startAngle);
    const outerX2 = centerX + radius * Math.cos(endAngle);
    const outerY2 = centerY + radius * Math.sin(endAngle);
    const innerX1 = centerX + radius * innerRadius * Math.cos(startAngle);
    const innerY1 = centerY + radius * innerRadius * Math.sin(startAngle);
    const innerX2 = centerX + radius * innerRadius * Math.cos(endAngle);
    const innerY2 = centerY + radius * innerRadius * Math.sin(endAngle);

    // Calculate label position (middle of the slice)
    const labelAngle = startAngle + angle / 2;
    const labelRadius = (radius * (1 - innerRadius)) / 2 + radius * innerRadius;
    const labelX = centerX + labelRadius * Math.cos(labelAngle);
    const labelY = centerY + labelRadius * Math.sin(labelAngle);

    const slice = {
      path: `M ${centerX},${centerY} L ${outerX1},${outerY1} A ${radius},${radius} 0 ${
        angle > Math.PI ? 1 : 0
      },1 ${outerX2},${outerY2} L ${innerX2},${innerY2} A ${
        radius * innerRadius
      },${radius * innerRadius} 0 ${
        angle > Math.PI ? 1 : 0
      },0 ${innerX1},${innerY1} Z`,
      percentage,
      color: colors[index % colors.length],
      labelX,
      labelY,
      name: item.name || `Slice ${index + 1}`,
    };

    startAngle = endAngle;
    return slice;
  });

  return (
    <div className="relative w-full rounded-md bg-gray-100 p-2 xl:w-4/12 dark:bg-slate-800">
      <h2 className="text-2xl font-bold text-black dark:text-white">
        Statistics
      </h2>
      <svg
        width={width}
        height={height - 30}
        className="mx-auto cursor-pointer overflow-visible"
      >
        {/* Donut Slices */}
        {slices.map((slice, index) => (
          <path
            key={index}
            d={slice.path}
            fill={slice.color}
            className="transition-opacity duration-200 hover:opacity-80"
          />
        ))}

        {/* Percentage Labels */}
        {slices.map((slice, index) => (
          <text
            key={`label-${index}`}
            x={slice.labelX}
            y={slice.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#efefef"
            className="text-[0.6rem] sm:text-[0.9rem]"
          >
            {`${slice.percentage.toFixed(1)}%`}
          </text>
        ))}
      </svg>

      {/* Department Breakdown */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-[20px] gap-y-[10px] px-[30px] sm:mt-0">
        {slices.map((slice, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="mr-2 h-3 w-3"
              style={{ backgroundColor: slice.color }}
            />
            <span className="text-[0.7rem] text-black sm:text-[0.9rem] dark:text-white">
              {slice.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
