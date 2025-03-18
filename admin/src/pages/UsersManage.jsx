import React, { useEffect, useState } from "react";
import Flex from "../components/common/Flex";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../components/common/Loader";
import Cookies from "js-cookie";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router";
import { IoEyeOutline } from "react-icons/io5";

const UsersManage = () => {
  const accessToken = Cookies.get("accessToken"); // access token
  const sessionToken = Cookies.get("sessionToken"); // access token
  const [users, setUsers] = useState([]);
  const [filterResult, setFilterResult] = useState([]);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleActionMenu = (id) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  // function for handle search
  const handleSearch = (e) => {
    if (e.target.value == "") {
      setFilterResult(orders);
    } else {
      const searchResult = users.filter((searchItem) =>
        searchItem.phone.includes(e.target.value.toLowerCase()),
      );
      setFilterResult(searchResult); // state for store the search result
    }
  };

  // function for admin toggle
  const handleAdmin = async (user) => {
    setIsLoading(true);
    try {
      let res = await axios.patch(
        `${import.meta.env.VITE_API}/auth/update/${user._id}`,
        { role: user.role == "admin" ? "user" : "admin" },
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

  // fetch users
  const fetchUsers = async () => {
    let res = await axios.get(
      `${import.meta.env.VITE_API}/auth/users`,
      {
        withCredentials: true,
      },
      {
        headers: {
          "Content-Type": "multipart/formdata",
          Cookie: `accessToken=${accessToken};sessionToken=${sessionToken}`,
        },
      },
    );

    setFilterResult(res.data.users);
    setUsers(res.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  console.log(users);

  return (
    <main className="w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      <Flex className="items-center justify-between">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Manage User's
        </h2>

        {isLoading && (
          <Flex className="fixed left-0 top-0 z-[99999999] h-screen w-full items-center justify-center bg-white dark:bg-slate-900">
            <Loader />
          </Flex>
        )}
        <div className="mb-4">
          <input
            placeholder="Search by phone..."
            // value={search}
            onChange={handleSearch}
            className="max-w-sm rounded-md border border-gray-200 px-4 py-2.5 outline-none focus:border-blue-300"
          />
        </div>
      </Flex>

      {/* Users List */}
      <section className="mt-10">
        <div className="customTable w-full rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-gray-200 dark:bg-slate-900">
              <tr>
                <th className="p-3 text-left font-medium text-black dark:text-white">
                  User Name
                </th>
                <th className="p-3 text-left font-medium text-black dark:text-white">
                  Email
                </th>
                <th className="p-3 text-left font-medium text-black dark:text-white">
                  Phone
                </th>
                <th className="p-3 text-left font-medium text-black dark:text-white">
                  Role
                </th>
                <th className="p-3 text-left font-medium text-black dark:text-white">
                  Make Admin
                </th>
                <th className="p-3 text-left font-medium text-black dark:text-white">
                  Verify
                </th>
                <th className="p-3 text-left font-medium text-black dark:text-white">
                  Address
                </th>
                <th className="p-3 text-left font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="">
              {users.map((item, index) => (
                <tr className="border-t border-gray-200" key={index}>
                  <td className="p-3 text-black dark:text-white">
                    {item.name}
                  </td>
                  <td className="p-3 text-black dark:text-white">
                    {item.email}
                  </td>
                  <td className="p-3 text-black dark:text-white">
                    {item.phone}
                  </td>
                  <td className="p-3 text-black dark:text-white">
                    {item.role == "admin" ? "Admin" : "User"}
                  </td>
                  <td className="p-3 text-black dark:text-white">
                    <div
                      className={`${
                        item.role == "admin" ? "!bg-[#3B9DF8]" : "bg-[#f0f0f0]"
                      } relative h-[30px] w-[57px] cursor-pointer rounded-full border border-[#e5eaf2] px-[0.150rem] py-[0.160rem] transition-colors duration-500`}
                      onClick={() => handleAdmin(item)}
                    >
                      <div
                        className={`${
                          item.role == "admin"
                            ? "translate-x-[27px] !bg-white"
                            : "translate-x-[1px]"
                        } h-[23px] w-[23px] rounded-full bg-[#fff] pb-1 transition-all duration-500`}
                        style={{ boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)" }}
                      ></div>
                    </div>
                  </td>

                  <td className="p-3 text-black dark:text-white">
                    {item.isVarify ? (
                      <div className="flex items-center justify-center gap-2 rounded-full bg-[#18c964] py-1.5 text-[0.9rem] font-[500] text-white">
                        <MdDone className="rounded-full bg-[#18c964] p-0.5 text-[1.4rem] text-[#fff]" />
                        Verified
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 rounded-full bg-red-500 py-1.5 text-[0.9rem] font-[500] text-white">
                        <FaTimes className="rounded-full bg-red-500 p-0.5 text-[1.4rem] text-[#fff]" />
                        Not Verified
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-black dark:text-white">
                    {item.address}
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
                      <button className="flex w-full cursor-pointer items-center gap-[8px] rounded-md px-2 py-1.5 text-[0.9rem] text-gray-700 transition-all duration-200 hover:bg-gray-50">
                        <MdDeleteOutline />
                        Delete
                      </button>
                      <Link
                        to={`/profile/${item._id}`}
                        className="flex w-full cursor-pointer items-center gap-[8px] rounded-md px-2 py-1.5 text-[0.9rem] text-gray-700 transition-all duration-200 hover:bg-gray-50"
                      >
                        <IoEyeOutline />
                        View Details
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!users?.length && (
            <p className="w-full py-6 text-center text-[0.9rem] text-gray-500">
              No data found!
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default UsersManage;
