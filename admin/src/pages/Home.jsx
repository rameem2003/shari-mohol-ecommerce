import React from "react";
import Stats from "../components/screens/Home/Stats";
import Flex from "../components/common/Flex";
import PieChart from "../components/screens/Home/PieChart";
import LastOrders from "../components/screens/Home/LastOrders";

const Home = () => {
  return (
    <main className="bg-white dark:bg-slate-900 border-l-[1px] border-black p-2 dark:border-white w-full">
      <Stats />
      <Flex className=" mt-5 max-h-[450px] items-start gap-4 ">
        <PieChart />
        <LastOrders />
      </Flex>
    </main>
  );
};

export default Home;
