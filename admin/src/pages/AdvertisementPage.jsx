import React, { useEffect, useState } from "react";
import Flex from "../components/common/Flex";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../components/common/Loader";
import { IoCloudUploadOutline } from "react-icons/io5";
import Image from "../components/common/Image";
import { FaStar } from "react-icons/fa";

const AdvertisementPage = () => {
  const accessToken = Cookies.get("accessToken"); // access token
  const sessionToken = Cookies.get("sessionToken"); // access token
  const [selectedImage, setSelectedImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [banner, setBanner] = useState({
    banner: null,
    description: "",
    advertisementLink: "",
  });
  const [banners, setBanners] = useState([]);

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    console.log(file);
    setSelectedImage(file);
    handleFile(file);
    setIsDragging(false);
    setBanner({ ...banner, banner: file });
  };

  // Function to validate and display the image
  const handleFile = (file) => {
    if (!file) return;

    if (file) {
      setErrorMessage("");
      const reader = new FileReader();
      console.log(reader.result);

      reader.onload = () => setSelectedImages(reader.result);
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

  // function for upload banner
  const handleUploadBanner = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("banner", banner.banner);
    formData.append("description", banner.description);
    formData.append("advertisementLink", banner.advertisementLink);

    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/banner/create`,
        formData,
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
      setIsLoading(false);

      Swal.fire({
        title: res.data.msg,
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
        icon: "success",
      })
        .then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        })
        .finally(() => {
          location.reload();
        });

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
      }).then((result) => {
        if (result.isDismissed) {
          location.reload();
        }
      });
    }
  };

  // fetch all banners
  const fetchAllBanners = async () => {
    let res = await axios.get(`${import.meta.env.VITE_API}/banner/all`);
    setBanners(res.data.data);
  };

  // handle delete banner
  const handleBannerDelete = async (id) => {
    setIsLoading(true);
    try {
      let res = await axios.delete(
        `${import.meta.env.VITE_API}/banner/delete/${id}`,
        {
          withCredentials: true,
        },
        {
          headers: {
            Cookie: `accessToken=${accessToken};sessionToken=${sessionToken}`,
          },
        },
      );

      setIsLoading(false);
      Swal.fire({
        title: res.data.msg,
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
        icon: "success",
      })
        .then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        })
        .finally(() => {
          location.reload();
        });

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
    fetchAllBanners();
  }, []);

  return (
    <main className="w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      <h2 className="text-2xl font-semibold text-black dark:text-white">
        Place and Manage Your Advertisements Banner
      </h2>

      {isLoading && (
        <Flex className="fixed left-0 top-0 z-[99999999] h-screen w-full items-center justify-center bg-white dark:bg-slate-900">
          <Loader />
        </Flex>
      )}

      {/* From */}
      <form action="" className="mt-10">
        <Flex className="mb-5 flex-col flex-wrap items-center gap-5 lg:flex-row lg:flex-nowrap">
          <div className="w-full lg:w-1/2">
            <div className="w-full">
              <label
                htmlFor="addDescription"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
              >
                Banner Description
              </label>
              <input
                required
                value={banner.description}
                onChange={(e) =>
                  setBanner({ ...banner, description: e.target.value })
                }
                type="text"
                name="addDescription"
                id="addDescription"
                placeholder="Advertisement Description"
                className="border-border focus:border-primary mt-1 w-full rounded-md border bg-white px-4 py-3 text-black outline-none transition-colors duration-300 dark:bg-transparent dark:text-white"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="w-full">
              <label
                htmlFor="addLink"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
              >
                Advertisement Link <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={banner.advertisementLink}
                onChange={(e) =>
                  setBanner({ ...banner, advertisementLink: e.target.value })
                }
                type="text"
                name="addLink"
                id="addLink"
                placeholder="Advertisement Link"
                className="border-border focus:border-primary mt-1 w-full rounded-md border bg-white px-4 py-3 text-black outline-none transition-colors duration-300 dark:bg-transparent dark:text-white"
              />
            </div>
          </div>
        </Flex>

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
            {selectedImage ? (
              <Flex className="flex-wrap items-center gap-5">
                <img
                  src={displayImage}
                  alt="Preview"
                  className="h-[200px] w-[200px] rounded-lg object-cover"
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
                      htmlFor="file-upload2"
                      className="mt-2 cursor-pointer rounded-md bg-gray-200 px-4 py-2"
                    >
                      Browse File
                    </label>
                    <input
                      id="file-upload2"
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

          {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}

          {selectedImage && (
            <div className="mt-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="rounded-lg bg-red-500 px-4 py-2 text-white"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleUploadBanner}
          type="submit"
          className="hover:bg-secondary w-full rounded border border-[#3B9DF8] bg-blue-500 px-6 py-2 text-[#fff] transition duration-300"
        >
          Add
        </button>
      </form>

      {/* Display Banners */}
      <section className="mt-5">
        <Flex className="mt-5 flex-wrap gap-5">
          {banners.map((b, i) => (
            <div
              className="boxShadow relative w-[24%] rounded-md bg-white"
              key={i}
            >
              <img
                src={b.banner}
                alt="image"
                className="h-[250px] w-full rounded-t-md object-cover"
              />

              <span
                onClick={() => handleBannerDelete(b._id)}
                className="absolute right-4 top-4 cursor-pointer rounded-full bg-red-500 px-3 py-0.5 text-[0.9rem] text-white"
              >
                Delete
              </span>

              <div className="p-3">
                <div className="flex items-center gap-[5px]">
                  <a
                    className="font-semibold text-red-500"
                    href={b.advertisementLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                </div>

                <h1 className="mt-1.5 text-[20px] font-bold leading-[24px] text-black">
                  {b.description}
                </h1>
              </div>
            </div>
          ))}
        </Flex>
      </section>
    </main>
  );
};

export default AdvertisementPage;
