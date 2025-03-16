import React, { useState } from "react";
import Flex from "../components/common/Flex";
import { IoCloudUploadOutline } from "react-icons/io5";

const AddCategory = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
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
  const handleUpload = (e) => {
    e.preventDefault();
    console.log(category);
  };
  return (
    <main className="bg-white dark:bg-slate-900 border-l-[1px] border-black p-2 dark:border-white w-full overflow-y-scroll">
      <h2 className=" text-black dark:text-white text-2xl font-semibold">
        Add New Category
      </h2>

      <form action="" className=" mt-10" onSubmit={handleUpload}>
        <Flex className="items-center gap-5 mb-5">
          <div className="w-1/2">
            <div className="w-full">
              <label
                htmlFor="name"
                className="text-[15px] text-text text-black dark:text-white font-[400]"
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
                placeholder="Your name"
                className="border-border border rounded-md text-black dark:text-white bg-white dark:bg-transparent outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="w-full">
              <label
                htmlFor="description"
                className="text-[15px] text-text text-black dark:text-white font-[400]"
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
                className="border-border border rounded-md text-black dark:text-white bg-white dark:bg-transparent outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
              />
            </div>
          </div>
        </Flex>

        <Flex className="items-center gap-5 mb-5">
          <div className="w-1/2">
            <div className="w-full">
              <label
                htmlFor="subcategory"
                className="text-[15px] text-text text-black dark:text-white font-[400]"
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
                placeholder="Your name"
                className="border-border border rounded-md text-black dark:text-white bg-white dark:bg-transparent outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
              />
            </div>
          </div>
        </Flex>

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

          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

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
          className="px-6 py-2 border border-[#3B9DF8] bg-blue-500 text-[#fff] hover:bg-secondary transition duration-300 rounded w-full"
        >
          Add
        </button>
      </form>
    </main>
  );
};

export default AddCategory;
