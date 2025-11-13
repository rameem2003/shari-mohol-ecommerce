import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ListSkeleton = () => {
  return (
    <tr className="flex w-full gap-[20px]">
      <td className="w-2/12">
        <Skeleton baseColor="#202020" highlightColor="#ddd" count={1} />
      </td>
      <td className="w-2/12">
        <Skeleton baseColor="#202020" highlightColor="#ddd" count={1} />
      </td>
      <td className="w-2/12">
        <Skeleton baseColor="#202020" highlightColor="#ddd" count={1} />
      </td>
      <td className="w-2/12">
        <Skeleton baseColor="#202020" highlightColor="#ddd" count={1} />
      </td>
      <td className="w-2/12">
        <Skeleton baseColor="#202020" highlightColor="#ddd" count={1} />
      </td>
      <td className="w-2/12">
        <Skeleton baseColor="#202020" highlightColor="#ddd" count={1} />
      </td>
    </tr>
  );
};

export default ListSkeleton;
