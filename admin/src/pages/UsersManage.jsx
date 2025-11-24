import React, { useEffect, useState } from "react";
import Flex from "../components/common/Flex";
import UsersList from "../components/common/UsersList";
import ListSkeleton from "../components/common/ListSkeleton";
import useAuth from "../hooks/useAuth";

const UsersManage = () => {
  const { users, loading, updateUserRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  // filter users based on search term
  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone &&
        user.phone.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const toggleActionMenu = (id) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  // function for handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // function for admin toggle
  const handleAdmin = async (user) => {
    await updateUserRole(user._id, user.role == "admin" ? "user" : "admin");
    return;
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

  return (
    <main className="w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      <Flex className="items-center justify-between">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Manage User's
        </h2>

        <div className="mb-4 w-full max-w-[500px] text-right">
          <input
            placeholder="Search by name , email or phone..."
            // value={search}
            onChange={handleSearch}
            className="w-full max-w-[300px] rounded-md border border-gray-200 px-4 py-2.5 outline-none focus:border-blue-300"
          />
        </div>
      </Flex>

      {loading && <ListSkeleton />}

      {!loading && (
        <UsersList
          filteredUsers={filteredUsers}
          toggleActionMenu={toggleActionMenu}
          openActionMenuId={openActionMenuId}
          handleAdmin={handleAdmin}
        />
      )}
    </main>
  );
};

export default UsersManage;
