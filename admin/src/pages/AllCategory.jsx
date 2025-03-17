import React, { useEffect, useState } from "react";
import Image from "./../components/common/Image";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import EditCategory from "../components/screens/categoryScreen/EditCategory";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // set the target category

  // Fetch categories
  const fetchCategories = async () => {
    let res = await axios.get(`${import.meta.env.VITE_API}/category/all`);
    setCategories(res.data.data);
  };

  const toggleActionMenu = (id) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  // function for edit modal
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  // on update
  const handleUpdate = () => {
    // Fetch updated category list logic
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleCLick = (event) => {
      if (
        !event.target.closest(".zenui-table") &&
        !event.target.closest(".action-btn")
      ) {
        setOpenActionMenuId(null);
      }
    };
    document.addEventListener("click", handleCLick);
    return () => document.removeEventListener("click", handleCLick);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <main className="bg-white dark:bg-slate-900 border-l-[1px] border-black p-2 dark:border-white w-full overflow-y-scroll">
      <h2 className=" text-black dark:text-white text-2xl font-semibold">
        All Categories
      </h2>

      <div className="customTable w-full rounded-md ">
        <table className="w-full text-sm">
          <thead className="bg-gray-200 dark:bg-slate-900">
            <tr>
              <th className="text-left text-black font-medium dark:text-white p-3">
                Image
              </th>
              <th className="text-left text-black font-medium dark:text-white p-3">
                Category Name
              </th>
              <th className="text-left text-black font-medium dark:text-white p-3">
                Sub Categories
              </th>
              <th className="text-left text-black font-medium dark:text-white p-3">
                Total Items
              </th>

              <th className="p-3 text-left font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="">
            {categories.map((item, index) => (
              <tr className="border-t border-gray-200 " key={item._id}>
                <td className=" p-3 text-black dark:text-white">
                  <Image
                    src={item.thumb}
                    className="w-10 h-10"
                    alt={item.thumb}
                  />
                </td>
                <td className=" p-3 text-black dark:text-white">{item.name}</td>
                <td className=" p-3 text-black dark:text-white">
                  {item.subCategories.toString()}
                </td>
                <td className=" p-3 text-black dark:text-white">
                  {item.products.length}
                </td>

                <td className="p-3 relative">
                  <BsThreeDotsVertical
                    onClick={() => toggleActionMenu(item._id)}
                    className="action-btn text-gray-600 dark:text-white cursor-pointer"
                  />

                  <div
                    className={`${
                      openActionMenuId === item._id
                        ? "opacity-100 scale-[1] z-30"
                        : "opacity-0 scale-[0.8] z-[-1]"
                    }
                                               ${
                                                 item._id > 1
                                                   ? "bottom-[90%]"
                                                   : "top-[90%]"
                                               }
                                               zenui-table absolute right-[80%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100`}
                  >
                    <button className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                      <MdDeleteOutline />
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                    >
                      <CiEdit />
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!categories?.length && (
          <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
            No data found!
          </p>
        )}
      </div>

      <EditCategory
        isModalOpen={isModalOpen}
        selectedCategory={selectedCategory}
        handleClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdate}
      />
    </main>
  );
};

export default AllCategory;
