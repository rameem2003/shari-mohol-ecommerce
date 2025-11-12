import React, { useEffect, useState } from "react";
import Flex from "../components/common/Flex";
import { CiEdit } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";
import Loader from "../components/common/Loader";
import useAuth from "../hooks/useAuth";

const ProfilePage = () => {
  const { user: admin, updateUser, updatePassword, loading, msg } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);

  // data state for admin
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    address: "",
  });

  // data state for password change
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    conFirmPassword: "",
  });
  // handle profile update
  const handleProfileUpdate = async () => {
    const formData = new FormData();
    formData.append("name", data.name);
    // formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    // if (data.photo) {
    //   formData.append("photo", data.photo);
    // }

    await updateUser(formData);
  };

  // handle password change
  const handlePasswordChange = async () => {
    await updatePassword(
      passwordData.oldPassword,
      passwordData.newPassword,
      passwordData.conFirmPassword,
    );
  };

  // Handle file selection when dropped or clicked
  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    console.log(file);
    setSelectedImage(file);
    handleFile(file);
    setIsDragging(false);
    setData({ ...data, photo: file });
  };

  // Function to validate and display the image
  const handleFile = (file) => {
    if (!file) return;

    if (file) {
      setErrorMessage("");
      const reader = new FileReader();
      console.log(reader.result);

      reader.onload = () => setSelectedImage(reader.result);
      //   reader.readAsDataURL(file);

      const url = URL.createObjectURL(file);
      setDisplayImage(url);
    } else {
      setErrorMessage("Please upload image file.");
      setSelectedImage(null);
    }
  };

  // Handle drag over event to allow the drop
  const handleImageDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (admin) {
      setData({
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        photo: "",
        address: admin.address,
      });

      setDisplayImage(admin.photo);
    }
  }, [admin]);

  return (
    <main className="w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      <h2 className="text-2xl font-semibold text-black dark:text-white">
        Profile Page
      </h2>

      {loading && (
        <Flex className="fixed left-0 top-0 z-[99999999] h-screen w-full items-center justify-center bg-white dark:bg-slate-900">
          <Loader />
        </Flex>
      )}
      <section className="mt-10">
        <Flex className="flex-col-reverse items-start gap-5 lg:flex-row">
          <div className="w-full lg:w-1/2 xl:w-3/12">
            <div className="mb-5 flex w-full flex-col items-center justify-center">
              <div
                className={`${
                  isDragging ? "border-blue-300 !bg-blue-50" : "border-gray-300"
                } ${
                  selectedImage ? "" : "border-2 border-dashed p-6"
                } flex h-64 w-full flex-col items-center justify-center rounded-lg bg-white dark:bg-slate-900`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleFileDrop}
                onDragOver={handleImageDragOver}
              >
                {displayImage ? (
                  <Flex className="relative flex-wrap items-center gap-5">
                    <label
                      htmlFor="file-upload-profile"
                      className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-500"
                    >
                      <CiEdit className="text-2xl text-white" />
                    </label>

                    <img
                      // htmlFor="file-upload-profile"
                      src={
                        displayImage.startsWith("blob", 0)
                          ? displayImage
                          : `${import.meta.env.VITE_MEDIA}/${displayImage}`
                      }
                      alt="Preview"
                      className="h-[200px] w-[200px] rounded-lg object-cover"
                    />
                    <input
                      id="file-upload-profile"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileDrop}
                    />
                  </Flex>
                ) : (
                  <>
                    {isDragging ? (
                      <h5 className="text-[2rem] font-[600] text-blue-700">
                        Drop Here
                      </h5>
                    ) : (
                      <>
                        <IoCloudUploadOutline className="mb-4 text-[3rem] text-gray-400" />
                        <p className="mb-2 text-center text-[1.1rem] font-[500] text-gray-500">
                          Drag & Drop your image here
                        </p>
                        <p className="text-gray-400">or</p>
                        <label
                          htmlFor="file-upload"
                          className="mt-2 cursor-pointer rounded-md bg-gray-200 px-4 py-2"
                        >
                          Browse File
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileDrop}
                        />
                      </>
                    )}
                  </>
                )}
              </div>

              {msg?.success == false && (
                <p className="mt-4 text-red-500">{msg?.success}</p>
              )}

              {/* {selectedImage && (
                <div className="mt-4">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white"
                  >
                    Remove Image
                  </button>
                </div>
              )} */}
            </div>
          </div>
          <div className="w-full lg:w-1/2 xl:w-9/12">
            <button
              onClick={handleProfileUpdate}
              className="ml-auto flex items-center gap-1 rounded-md bg-red-500 px-3 py-2 text-white"
            >
              <CiEdit className="text-lg text-white" />
              Update
            </button>

            <div className="mb-5 w-full">
              <label
                htmlFor="name"
                className="text-[15px] font-[400] text-black dark:text-white"
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
                className="mt-1 w-full rounded-md border border-border px-4 py-3 outline-none transition-colors duration-300 focus:border-primary"
              />
            </div>

            <div className="mb-5 w-full">
              <label
                htmlFor="email"
                className="text-[15px] font-[400] text-black dark:text-white"
              >
                Email
              </label>
              <input
                disabled
                type="text"
                name="email"
                id="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Your name"
                className="mt-1 w-full rounded-md border border-border px-4 py-3 outline-none transition-colors duration-300 focus:border-primary"
              />
            </div>

            <div className="mb-5 w-full">
              <label
                htmlFor="phone"
                className="text-[15px] font-[400] text-black dark:text-white"
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
                className="mt-1 w-full rounded-md border border-border px-4 py-3 outline-none transition-colors duration-300 focus:border-primary"
              />
            </div>

            <div className="mb-5 w-full">
              <label
                htmlFor="address"
                className="text-[15px] font-[400] text-black dark:text-white"
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
                className="mt-1 w-full rounded-md border border-border px-4 py-3 outline-none transition-colors duration-300 focus:border-primary"
              />
            </div>
          </div>
        </Flex>
      </section>

      <section className="mt-10 border-t-[1px] border-black py-5 dark:border-white">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Change Password
        </h2>

        <div className="mt-5">
          <div className="mb-5 w-full md:w-1/2">
            <label
              htmlFor="old-password"
              className="text-[15px] font-[400] text-black dark:text-white"
            >
              Old Password <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="old-password"
              id="old-password"
              value={passwordData.oldPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  oldPassword: e.target.value,
                })
              }
              placeholder="Your Old Password"
              className="mt-1 w-full rounded-md border border-border px-4 py-3 outline-none transition-colors duration-300 focus:border-primary"
            />
          </div>

          <div className="mb-5 w-full md:w-1/2">
            <label
              htmlFor="new-password"
              className="text-[15px] font-[400] text-black dark:text-white"
            >
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="new-password"
              id="new-password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
              placeholder="Your New Password"
              className="mt-1 w-full rounded-md border border-border px-4 py-3 outline-none transition-colors duration-300 focus:border-primary"
            />
          </div>

          <div className="mb-5 w-full md:w-1/2">
            <label
              htmlFor="confirm-new-password"
              className="text-[15px] font-[400] text-black dark:text-white"
            >
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="confirm-new-password"
              id="confirm-new-password"
              value={passwordData.conFirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  conFirmPassword: e.target.value,
                })
              }
              placeholder="Your Confirm New Password"
              className="mt-1 w-full rounded-md border border-border px-4 py-3 outline-none transition-colors duration-300 focus:border-primary"
            />
          </div>

          <button
            onClick={handlePasswordChange}
            className="flex items-center gap-1 rounded-md bg-blue-500 px-3 py-2 text-white"
          >
            <CiEdit className="text-lg text-white" />
            Change Password
          </button>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
