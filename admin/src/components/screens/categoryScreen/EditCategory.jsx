import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
// react icons
import { RxCross1 } from "react-icons/rx";
import Flex from "../../common/Flex";

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

  // upload product local object
  const [category, setCategory] = useState({
    name: selectedCategory?.name || "",
    description: selectedCategory?.description || "",
    subcategories: selectedCategory?.subCategories || "",
    image: null,
  });

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
  console.log(category);

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
    e.preventDefault();
    console.log(category);
  };

  return (
    <div
      className={`${
        isModalOpen ? " visible" : " invisible"
      } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
    >
      <div
        className={`${
          isModalOpen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
        } w-[90%] sm:w-[80%] md:w-[35%] bg-white dark:bg-slate-700 rounded-lg transition-all duration-300 mx-auto mt-8`}
      >
        <div className="w-full flex items-end p-4 justify-between border-b border-[#d1d1d1]">
          <h1 className="text-[1.5rem] font-bold text-black dark:text-white">
            Edit Category
          </h1>
          <RxCross1
            className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] text-red-600 rounded-full transition-all duration-300 cursor-pointer"
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
              className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
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
              className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
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
              className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
            />
          </div>

          <div className="flex justify-center items-center w-full flex-col mb-5">
            <div
              className={`${
                isDragging ? "border-blue-300 !bg-blue-50" : "border-gray-300"
              } ${
                selectedImage ? "" : "border-dashed border-2 p-6"
              } rounded-lg w-full h-64 flex flex-col justify-center items-center bg-white dark:bg-slate-900`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleFileDrop}
              onDragOver={handleImageDragOver}
            >
              {selectedImage ? (
                <Flex className="items-center gap-5 flex-wrap">
                  <img
                    src={displayImage}
                    alt="Preview"
                    className="w-[200px] h-[200px] object-cover rounded-lg"
                  />
                </Flex>
              ) : (
                <>
                  {isDragging ? (
                    <h5 className="text-[2rem] text-blue-700 font-[600]">
                      Drop Here
                    </h5>
                  ) : (
                    <>
                      <IoCloudUploadOutline className="text-[3rem] mb-4 text-gray-400" />
                      <p className="text-gray-500 text-center text-[1.1rem] font-[500] mb-2">
                        Drag & Drop your image here
                      </p>
                      <p className="text-gray-400">or</p>
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer py-2 px-4 bg-gray-200 rounded-md mt-2"
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
              <p className="text-red-500 mt-4">{errorMessage}</p>
            )}

            {selectedImage && (
              <div className="mt-4">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="py-2 px-4 w-full bg-[#3B9DF8] text-[#fff] rounded-md"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
