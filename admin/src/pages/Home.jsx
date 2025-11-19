import React from "react";
import Stats from "../components/screens/Home/Stats";
import Flex from "../components/common/Flex";
import LastOrders from "../components/screens/Home/LastOrders";
import BarChartMonthlyRevenue from "../components/screens/Home/BarChartMonthlyRevenue";
import BarChartStatsByPaymentStatus from "../components/screens/Home/BarChartStatsByPaymentStatus";

const Home = () => {
  return (
    <main className="h-screen w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      <Stats />
      <Flex className="mb-5 mt-5 flex flex-wrap justify-between gap-4">
        <BarChartMonthlyRevenue />
        <BarChartStatsByPaymentStatus />
      </Flex>
      <LastOrders />
    </main>
  );
};

export default Home;
