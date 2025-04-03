import React, { useState } from "react";
import { useSelector } from "react-redux";
import useProfile from "../../../hooks/useProfile";

const ChangePassword = () => {
  const user = useSelector((state) => state.account.account); // user
  const { handlePasswordChange, isLoading } = useProfile();
  // data state for password change
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    conFirmPassword: "",
  });

  return (
    <section>
      {/* <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handlePasswordChange(user.id, passwordData);
        }}
      ></form> */}
      <div className=" mb-5">
        <label className="text-sm text-slate-800 font-medium mb-2 block">
          Old Password <span className=" text-red-600">*</span>
        </label>
        <input
          value={passwordData.oldPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, oldPassword: e.target.value })
          }
          name="oldPassword"
          type="text"
          required
          className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-purple-600 focus:bg-transparent"
          placeholder="Enter Old Password"
        />
      </div>

      <div className=" mb-5">
        <label className="text-sm text-slate-800 font-medium mb-2 block">
          New Password <span className=" text-red-600">*</span>
        </label>
        <input
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, newPassword: e.target.value })
          }
          name="newPassword"
          type="text"
          required
          className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-purple-600 focus:bg-transparent"
          placeholder="Enter New Password"
        />
      </div>

      <div className=" mb-5">
        <label className="text-sm text-slate-800 font-medium mb-2 block">
          Confirm New Password <span className=" text-red-600">*</span>
        </label>
        <input
          value={passwordData.conFirmPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              conFirmPassword: e.target.value,
            })
          }
          name="conFirmPassword"
          type="text"
          required
          className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-purple-600 focus:bg-transparent"
          placeholder="Confirm New Password"
        />
      </div>

      <button
        onClick={(e) => handlePasswordChange(user.id, passwordData)}
        disabled={isLoading}
        type="submit"
        className=" w-full md:w-1/3 bg-purple-700 hover:bg-purple-800 px-4 py-3 rounded-md text-white text-sm font-medium "
      >
        {isLoading ? "Changing..." : "Change Password"}
      </button>
    </section>
  );
};

export default ChangePassword;
