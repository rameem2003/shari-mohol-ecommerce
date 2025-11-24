import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import { MdDone } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";

const UsersList = ({
  filteredUsers,
  toggleActionMenu,
  openActionMenuId,
  handleAdmin,
}) => {
  const { user: admin } = useAuth();
  return (
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
            {filteredUsers?.map((item, index) => (
              <tr className="border-t border-gray-200" key={index}>
                <td className="p-3 text-black dark:text-white">{item.name}</td>
                <td className="p-3 text-black dark:text-white">{item.email}</td>
                <td className="p-3 text-black dark:text-white">{item.phone}</td>
                <td className="p-3 text-black dark:text-white">
                  {item.role == "admin" ? "Admin" : "User"}
                </td>
                <td className="p-3 text-black dark:text-white">
                  {item._id === admin?.id ? (
                    "You"
                  ) : (
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
                        style={{
                          boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)",
                        }}
                      ></div>
                    </div>
                  )}
                </td>

                <td className="p-3 text-black dark:text-white">
                  {item.isVerified ? (
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
                    {/* {admin?.id !== item._id && (
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="flex w-full cursor-pointer items-center gap-[8px] rounded-md px-2 py-1.5 text-[0.9rem] text-gray-700 transition-all duration-200 hover:bg-gray-50"
                        >
                          <MdDeleteOutline />
                          Delete
                        </button>
                      )} */}
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

        {!filteredUsers?.length && (
          <p className="w-full py-6 text-center text-[0.9rem] text-gray-500">
            No data found!
          </p>
        )}
      </div>
    </section>
  );
};

export default UsersList;
