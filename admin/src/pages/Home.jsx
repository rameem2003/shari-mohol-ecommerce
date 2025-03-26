import React from "react";
import Stats from "../components/screens/Home/Stats";
import Flex from "../components/common/Flex";
import PieChart from "../components/screens/Home/PieChart";
import LastOrders from "../components/screens/Home/LastOrders";

const Home = () => {
  return (
    <main className="h-screen w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      <Stats />
      <Flex className="mt-5 h-full flex-col items-start gap-4 lg:max-h-[450px] xl:flex-row">
        <PieChart />
        <LastOrders />
      </Flex>
    </main>
  );
};

export default Home;
