import React, { useEffect, useState } from "react";
import Flex from "../components/common/Flex";
import axios from "axios";
import Cookies from "js-cookie";

const UsersManage = () => {
  const accessToken = Cookies.get("accessToken"); // access token
  const sessionToken = Cookies.get("sessionToken"); // access token
  const [users, setUsers] = useState([]);
  const [filterResult, setFilterResult] = useState([]);

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
  console.log(filterResult);

  return (
    <main className="w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      <Flex className="items-center justify-between">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Manage User's
        </h2>

        <div className="mb-4">
          <input
            placeholder="Search by phone..."
            // value={search}
            onChange={handleSearch}
            className="max-w-sm rounded-md border border-gray-200 px-4 py-2.5 outline-none focus:border-blue-300"
          />
        </div>
      </Flex>
    </main>
  );
};

export default UsersManage;
