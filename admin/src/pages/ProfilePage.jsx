import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Flex from "../components/common/Flex";
import Image from "../components/common/Image";
import profile from "../assets/profile.png";

const ProfilePage = () => {
  const admin = useSelector((state) => state.admin.admin);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    address: "",
  });

  useEffect(() => {
    if (admin) {
      setData({
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        photo: admin.photo,
        address: admin.address,
      });
    }
  }, []);

  return (
    <main className="w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      <h2 className="text-2xl font-semibold text-black dark:text-white">
        Profile Page
      </h2>

      <section className="mt-10">
        <Flex className="items-start gap-5">
          <div className="w-full md:w-3/12">
            <Image
              alt={data.name}
              src={data.photo ? data.photo : profile}
              className="rounded-md"
            />
          </div>
          <div className="w-full md:w-9/12">
            <div className="mb-5 w-full">
              <label
                htmlFor="name"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Your name"
                className="border-border focus:border-primary mt-1 w-full rounded-md border px-4 py-3 outline-none transition-colors duration-300"
              />
            </div>

            <div className="mb-5 w-full">
              <label
                htmlFor="email"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Your name"
                className="border-border focus:border-primary mt-1 w-full rounded-md border px-4 py-3 outline-none transition-colors duration-300"
              />
            </div>

            <div className="mb-5 w-full">
              <label
                htmlFor="phone"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
              >
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                placeholder="Your name"
                className="border-border focus:border-primary mt-1 w-full rounded-md border px-4 py-3 outline-none transition-colors duration-300"
              />
            </div>

            <div className="mb-5 w-full">
              <label
                htmlFor="address"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={data.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
                placeholder="Your name"
                className="border-border focus:border-primary mt-1 w-full rounded-md border px-4 py-3 outline-none transition-colors duration-300"
              />
            </div>
          </div>
        </Flex>
      </section>
    </main>
  );
};

export default ProfilePage;
