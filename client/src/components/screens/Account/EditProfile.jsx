import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Flex from "../../common/Flex";
import useProfile from "../../../hooks/useProfile";

const EditProfile = () => {
  const { handleProfileUpdate, isLoading } = useProfile();
  const user = useSelector((state) => state.account.account); // user
  const [displayImage, setDisplayImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    photo: "",
  });

  // image upload handler
  const imageUpload = (e) => {
    const file = e.target.files[0];
    setData({ ...data, photo: file });

    let display = URL.createObjectURL(file);
    setDisplayImage(display);
  };

  useEffect(() => {
    setData({
      name: user.name,
      phone: user.phone,
      address: user.address,
      photo: user.photo,
    });
  }, [user]);
  return (
    <section>
      <Flex className="flex-wrap gap-5">
        <div className=" w-full md:w-4/12 xl:w-3/12">
          <img
            className=" w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full"
            // src={user.photo ? user.photo : displayImage}
            src={displayImage ? displayImage : user.photo}
            alt="profile"
          />
          <input
            onChange={imageUpload}
            type="file"
            name=""
            hidden
            id="upload-image"
          />

          <label
            htmlFor="upload-image"
            className=" px-5 py-1 rounded-lg bg-slate-800 text-white mt-10 inline-block cursor-pointer"
          >
            Upload Image
          </label>
        </div>
        <div className=" w-full md:w-8/12 xl:w-9/12">
          <div className=" mb-5">
            <label className="text-sm text-slate-800 font-medium mb-2 block">
              Name
            </label>
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              name="name"
              type="text"
              required=""
              className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-purple-600 focus:bg-transparent"
              placeholder="Enter Name"
            />
          </div>

          <div className=" mb-5">
            <label className="text-sm text-slate-800 font-medium mb-2 block">
              Phone
            </label>
            <input
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              name="phone"
              type="text"
              required=""
              className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-purple-600 focus:bg-transparent"
              placeholder="Enter Phone"
            />
          </div>

          <div className=" mb-5">
            <label className="text-sm text-slate-800 font-medium mb-2 block">
              Address
            </label>
            <input
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              name="address"
              type="text"
              required=""
              className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-purple-600 focus:bg-transparent"
              placeholder="Enter Address"
            />
          </div>

          <button
            onClick={() => handleProfileUpdate(user.id, data)}
            disabled={isLoading}
            className=" px-5 py-1 rounded-lg bg-purple-700 hover:bg-purple-800 text-white mt-10"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </Flex>
    </section>
  );
};

export default EditProfile;
