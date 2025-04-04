import React, { useEffect, useState } from "react";
import Image from "./../components/common/Image";
import axios from "axios";
import EditCategory from "../components/screens/categoryScreen/EditCategory";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Loader from "../components/common/Loader";
import Flex from "../components/common/Flex";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const AllCategory = () => {
  const accessToken = Cookies.get("accessToken"); // access token
  const sessionToken = Cookies.get("sessionToken"); // access token
  const [categories, setCategories] = useState([]);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // set the target category
  const [isLoading, setIsLoading] = useState(false);

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

  // handle delete
  const handleDelete = async (id) => {
    setIsLoading(true);
    console.log("Delete:", id);

    try {
      let res = await axios.delete(
        `${import.meta.env.VITE_API}/category/delete/${id}`,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken};sessionToken=${sessionToken}`,
          },
        },
      );

      Swal.fire({
        title: res.data.msg,
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
        icon: "success",
      }).finally(() => {
        location.reload();
      });
      setIsLoading(false);

      console.log(res.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);

      Swal.fire({
        title: error.response.data.msg,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "Ok",
        cancelButtonColor: "red",
        icon: "error",
      })
        .then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        })
        .finally(() => {
          location.reload();
        });
    }
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
  }, [isModalOpen]);
  return (
    <main className="w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      <h2 className="text-2xl font-semibold text-black dark:text-white">
        All Categories
      </h2>

      {isLoading && (
        <Flex className="fixed left-0 top-0 z-[99999999] h-screen w-full items-center justify-center bg-white dark:bg-slate-900">
          <Loader />
        </Flex>
      )}

      {/* Category Table */}
      <div className="customTable w-full rounded-md">
        <table className="w-full text-sm">
          <thead className="bg-gray-200 dark:bg-slate-900">
            <tr>
              <th className="p-3 text-left font-medium text-black dark:text-white">
                Image
              </th>
              <th className="p-3 text-left font-medium text-black dark:text-white">
                Category Name
              </th>
              <th className="p-3 text-left font-medium text-black dark:text-white">
                Sub Categories
              </th>
              <th className="p-3 text-left font-medium text-black dark:text-white">
                Total Items
              </th>

              <th className="p-3 text-left font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="">
            {categories.map((item, index) => (
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
                <td className="p-3 text-black dark:text-white">
                  {item.products.length}
                </td>

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
            ))}
          </tbody>
        </table>

        {!categories?.length && (
          <p className="w-full py-6 text-center text-[0.9rem] text-gray-500">
            No data found!
          </p>
        )}
      </div>

      {/* Edit Modal */}
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
