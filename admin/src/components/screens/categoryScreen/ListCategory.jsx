import React from "react";
import Image from "../../common/Image";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const ListCategory = ({
  item,
  openActionMenuId,
  toggleActionMenu,
  handleDelete,
  handleEdit,
}) => {
  return (
    <tr className="border-t border-gray-200" key={item._id}>
      <td className="p-3 text-black dark:text-white">
        <Image
          src={`${import.meta.env.VITE_MEDIA}/${item.thumb}`}
          className="h-10 w-10"
          alt={item.thumb}
        />
      </td>
      <td className="p-3 text-black dark:text-white">{item.name}</td>
      <td className="p-3 text-black dark:text-white">
        {item.subCategories.toString()}
      </td>
      <td className="p-3 text-black dark:text-white">{item.products.length}</td>

      <td className="relative p-3">
        <BsThreeDotsVertical
          onClick={() => toggleActionMenu(item._id)}
          className="action-btn cursor-pointer text-gray-600 dark:text-white"
        />

        <div
          className={`${
            openActionMenuId === item._id
              ? "z-30 scale-[1] opacity-100"
              : "z-[-1] scale-[0.8] opacity-0"
          } ${
            item._id > 1 ? "bottom-[90%]" : "top-[90%]"
          } zenui-table absolute right-[80%] min-w-[160px] rounded-md bg-white p-1.5 shadow-md transition-all duration-100`}
        >
          <button
            onClick={() => handleDelete(item._id)}
            className="flex w-full cursor-pointer items-center gap-[8px] rounded-md px-2 py-1.5 text-[0.9rem] text-gray-700 transition-all duration-200 hover:bg-gray-50"
          >
            <MdDeleteOutline />
            Delete
          </button>
          <button
            onClick={() => handleEdit(item)}
            className="flex w-full cursor-pointer items-center gap-[8px] rounded-md px-2 py-1.5 text-[0.9rem] text-gray-700 transition-all duration-200 hover:bg-gray-50"
          >
            <CiEdit />
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ListCategory;
