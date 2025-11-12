import React, { useEffect, useState } from "react";
import Flex from "../../common/Flex";
import { updateCategoryRequest } from "../../../api/category";
import { toast } from "react-toastify";
// react icons
import { IoCloudUploadOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

const EditCategory = ({
  isModalOpen,
  selectedCategory,
  handleClose,
  onUpdate,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // upload product local object
  const [category, setCategory] = useState({
    name: selectedCategory?.name || "",
    description: selectedCategory?.description || "",
    subcategories: selectedCategory?.subCategories || "",
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

  // update the category
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", category.name);
      formDataToSend.append("description", category.description);
      formDataToSend.append("subCategories", category.subcategories);
      if (category.image) {
        formDataToSend.append("image", category.image);
      }

      const res = await updateCategoryRequest(
        selectedCategory._id,
        formDataToSend,
      );
      setIsLoading(false);

      if (!res.success) {
        toast.error(res.response.data.message);
        return;
      }
      toast.success(res.message);
      onUpdate(); // Refresh the category list
      handleClose();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.response?.data?.message || error.message);
      handleClose();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      setCategory({
        name: selectedCategory.name || "",
        description: selectedCategory.description || "",
        subcategories: selectedCategory.subCategories || "",
        image: selectedCategory.thumb || "",
      });
    }
  }, [selectedCategory]);

  return (
    <div
      className={`${
        isModalOpen ? "visible" : "invisible"
      } fixed left-0 top-0 z-[200000000] flex h-screen w-full items-center justify-center bg-[#0000002a] transition-all duration-300`}
    >
      {isLoading && (
        <Flex className="fixed left-0 top-0 z-[99999999] h-screen w-full items-center justify-center bg-white dark:bg-slate-900">
          <Loader />
        </Flex>
      )}
      <div
        className={`${
          isModalOpen ? "scale-[1] opacity-100" : "scale-[0] opacity-0"
        } mx-auto mt-8 w-[90%] rounded-lg bg-white transition-all duration-300 sm:w-[80%] md:w-[35%] dark:bg-slate-700`}
      >
        <div className="flex w-full items-end justify-between border-b border-[#d1d1d1] p-4">
          <h1 className="text-[1.5rem] font-bold text-black dark:text-white">
            Edit Category
          </h1>
          <RxCross1
            className="cursor-pointer rounded-full p-2 text-[2.5rem] text-red-600 transition-all duration-300 hover:bg-[#e7e7e7]"
            onClick={() => handleClose()}
          />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-4">
          <div>
            <label
              htmlFor="name"
              className="text-[1rem] font-[500] text-[#464646] dark:text-white"
            >
              Category Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              placeholder="Category Name"
              className="mt-1 w-full rounded-md border border-[#d1d1d1] px-3 py-2 focus:border-[#3B9DF8] focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="text-[1rem] font-[500] text-[#464646] dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={category.description}
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
              placeholder="Description"
              className="mt-1 w-full rounded-md border border-[#d1d1d1] px-3 py-2 focus:border-[#3B9DF8] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="subCat"
              className="text-[1rem] font-[500] text-[#464646] dark:text-white"
            >
              Sub Categories
            </label>
            <input
              type="text"
              name="subCat"
              id="subCat"
              value={category.subcategories.toString()}
              onChange={(e) =>
                setCategory({ ...category, subcategories: e.target.value })
              }
              placeholder="Sub Categories"
              className="mt-1 w-full rounded-md border border-[#d1d1d1] px-3 py-2 focus:border-[#3B9DF8] focus:outline-none"
            />
          </div>

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

            {errorMessage && (
              <p className="mt-4 text-red-500">{errorMessage}</p>
            )}

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
            className="w-full rounded-md bg-[#3B9DF8] px-4 py-2 text-[#fff]"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
