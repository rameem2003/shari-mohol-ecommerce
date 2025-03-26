import React, { useState } from "react";
import Flex from "../components/common/Flex";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Loader from "../components/common/Loader";
import axios from "axios";
import { IoCloudUploadOutline } from "react-icons/io5";

const AddCategory = () => {
  const accessToken = Cookies.get("accessToken"); // access token
  const sessionToken = Cookies.get("sessionToken"); // access token
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // upload product local object
  const [category, setCategory] = useState({
    name: "",
    description: "",
    subcategory: "",
    image: null,
  });

  // Handle file selection when dropped or clicked
  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    console.log(file);
    setSelectedImage(file);
    handleFile(file);
    setIsDragging(false);
    setCategory({ ...category, image: file });
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

  // Product upload
  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(category);

    setIsLoading(true);
    let data = new FormData();
    data.append("name", category.name);
    data.append("description", category.description);
    data.append("subCategories", category.subcategory);
    data.append("image", category.image);

    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/category/create`,
        data,
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
  return (
    <main className="w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      <h2 className="text-2xl font-semibold text-black dark:text-white">
        Add New Category
      </h2>

      {isLoading && (
        <Flex className="fixed left-0 top-0 z-[99999999] h-screen w-full items-center justify-center bg-white dark:bg-slate-900">
          <Loader />
        </Flex>
      )}

      {/* Form section */}
      <form action="" className="mt-10" onSubmit={handleUpload}>
        <Flex className="mb-5 flex-col items-center gap-5 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="w-full">
              <label
                htmlFor="name"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
              >
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={category.name}
                onChange={(e) =>
                  setCategory({ ...category, name: e.target.value })
                }
                type="text"
                name="name"
                id="name"
                placeholder="Category name"
                className="border-border focus:border-primary mt-1 w-full rounded-md border bg-white px-4 py-3 text-black outline-none transition-colors duration-300 dark:bg-transparent dark:text-white"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="w-full">
              <label
                htmlFor="description"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
              >
                Category Description <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={category.description}
                onChange={(e) =>
                  setCategory({ ...category, description: e.target.value })
                }
                type="text"
                name="description"
                id="description"
                placeholder="Product Description"
                className="border-border focus:border-primary mt-1 w-full rounded-md border bg-white px-4 py-3 text-black outline-none transition-colors duration-300 dark:bg-transparent dark:text-white"
              />
            </div>
          </div>
        </Flex>

        <Flex className="mb-5 items-center gap-5">
          <div className="w-full">
            <div className="w-full">
              <label
                htmlFor="subcategory"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
              >
                Sub Categories (Input Comma Separated){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={category.subcategory}
                onChange={(e) =>
                  setCategory({ ...category, subcategory: e.target.value })
                }
                type="text"
                name="subcategory"
                id="subcategory"
                placeholder="Sub Categories"
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
          type="submit"
          className="hover:bg-secondary w-full rounded border border-[#3B9DF8] bg-blue-500 px-6 py-2 text-[#fff] transition duration-300"
        >
          Add
        </button>
      </form>
    </main>
  );
};

export default AddCategory;
