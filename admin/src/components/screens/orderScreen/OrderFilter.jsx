import React from "react";
import Flex from "../../common/Flex";
import StatusSelect from "./StatusSelect";
import MethodSelect from "./MethodSelect";

const OrderFilter = ({ setStatus, setMethod }) => {
  return (
    <Flex className="my-2 mb-4 w-full items-center justify-between">
      <div className="w-[30%]">
        <h2 className="mb-2 text-base font-medium text-white">By Status</h2>
        <StatusSelect setStatus={setStatus} />
      </div>
      <div className="w-[30%]">
        <h2 className="mb-2 text-base font-medium text-white">By Method</h2>
        <MethodSelect setMethod={setMethod} />
      </div>
      <div className="w-[30%]"></div>
    </Flex>
  );
};

export default OrderFilter;
