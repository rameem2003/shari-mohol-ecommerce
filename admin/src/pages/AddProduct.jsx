import React, { useEffect, useState } from "react";
import Flex from "../components/common/Flex";
import axios from "axios";
// react icons
import { IoChevronDown } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";

const AddProduct = () => {
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [mainCategory, setMainCategory] = useState("Select Option");
  const [subCat, setSubCat] = useState("Select Option");
  const [selectedImages, setSelectedImages] = useState(null);
  const [displayImages, setDisplayImages] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  // upload product local object
  const [product, setProduct] = useState({
    name: "",
    description: "",
    sellingPrice: "",
    discountPrice: "",
    colors: "",
    sizes: "",
    stock: "",
    category: "",
    subcategory: "",
    images: null,
  });

  // outside click to off dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      let target = event.target;

      if (!target.closest(".dropdown")) {
        setIsActive(false);
      }
      if (!target.closest(".dropdown1")) {
        setIsActive1(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    let res = await axios.get(`${import.meta.env.VITE_API}/category/all`);
    setCategories(res.data.data);
  };

  //  Fetch sub Categories
  const fetchSubCategories = async (id) => {
    let res = await axios.get(
      `${import.meta.env.VITE_API}/category/single/${id}`
    );

    setSubCategories(res.data.data.subCategories);
  };

  // Handle file selection when dropped or clicked
  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    console.log(file);
    setSelectedImages(file);
    handleFile(file);
    setIsDragging(false);
    setProduct({ ...product, images: file });
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

      const fileArray = Array.from(file);
      const urls = fileArray.map((f) => URL.createObjectURL(f));
      setDisplayImages(urls);
    } else {
      setErrorMessage("Please upload image file.");
      setSelectedImages(null);
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
    fetchCategories();
  }, []);

  // Product upload
  const handleUpload = (e) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <main className="bg-white dark:bg-slate-900 border-l-[1px] border-black p-2 dark:border-white w-full overflow-y-scroll">
      <h2 className=" text-black dark:text-white text-2xl font-semibold">
        Add New Product
      </h2>

      <form action="" className=" mt-10" onSubmit={handleUpload}>
        <Flex className="items-center gap-5 mb-5">
          <div className="w-1/2">
            <div className="w-full">
              <label
                htmlFor="name"
                className="text-[15px] text-text text-black dark:text-white font-[400]"
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
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
                Product Description <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
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
                htmlFor="selling"
                className="text-[15px] text-text text-black dark:text-white font-[400]"
              >
                Selling Price <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={product.sellingPrice}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    sellingPrice: parseInt(e.target.value),
                  })
                }
                type="number"
                name="selling"
                id="selling"
                placeholder="Selling Price"
                className="border-border border rounded-md text-black dark:text-white bg-white dark:bg-transparent outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="w-full">
              <label
                htmlFor="discount"
                className="text-[15px] text-text text-black dark:text-white font-[400]"
              >
                Discount Price
              </label>
              <input
                value={product.discountPrice}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    discountPrice: parseInt(e.target.value),
                  })
                }
                type="number"
                name="discount"
                id="discount"
                placeholder="Discount Price"
                className="border-border border rounded-md text-black dark:text-white bg-white dark:bg-transparent outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
              />
            </div>
          </div>
        </Flex>

        <Flex className="items-center gap-5 mb-5">
          <div className="w-1/2">
            <div className="w-full">
              <label
                htmlFor="colors"
                className="text-[15px] text-text text-black dark:text-white font-[400]"
              >
                Colors (Input Comma Separated)
                <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={product.colors}
                onChange={(e) =>
                  setProduct({ ...product, colors: e.target.value })
                }
                type="text"
                name="colors"
                id="colors"
                placeholder="Colors (Input Comma Separated)"
                className="border-border border rounded-md text-black dark:text-white bg-white dark:bg-transparent outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="w-full">
              <label
                htmlFor="size"
                className="text-[15px] text-text text-black dark:text-white font-[400]"
              >
                Size (Input Comma Separated)
              </label>
              <input
                value={product.sizes}
                onChange={(e) =>
                  setProduct({ ...product, sizes: e.target.value })
                }
                type="text"
                name="size"
                id="size"
                placeholder="Size (Input Comma Separated)"
                className="border-border border rounded-md text-black dark:text-white bg-white dark:bg-transparent outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
              />
            </div>
          </div>
        </Flex>

        <Flex className="items-center gap-5 mb-5">
          <div className="w-1/3">
            <div className=" mb-4 flex flex-col gap-5 justify-start w-full">
              <label
                htmlFor="name"
                className="text-[15px] text-text text-black dark:text-white font-[400]"
              >
                Select Category
                <span className="text-red-500">*</span>
              </label>
              <button
                className="bg-white dark:bg-slate-800 border text-black dark:text-white w-full border-[#d1d1d1] rounded-md justify-between px-3 py-2 flex items-center gap-8  relative cursor-pointer dropdown"
                onClick={() => setIsActive(!isActive)}
              >
                {mainCategory}
                <IoChevronDown
                  className={`${
                    isActive ? " rotate-[180deg]" : " rotate-0"
                  } transition-all duration-300 text-[1.2rem]`}
                />
                <div
                  className={`${
                    isActive
                      ? " z-[1] opacity-100 scale-[1]"
                      : " z-[-1] opacity-0 scale-[0.8]"
                  } w-full absolute top-12 left-0 right-0 z-40 bg-white dark:bg-slate-900 rounded-xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out`}
                  style={{
                    boxShadow: "0 15px 60px -15px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {categories?.map((cat, index) => (
                    <p
                      className="py-2 px-4 text-black dark:text-white transition-all duration-200 text-left"
                      key={cat._id}
                      onClick={(e) => {
                        setProduct({ ...product, category: cat._id });
                        setMainCategory(e.target.textContent);
                        fetchSubCategories(cat._id);
                      }}
                    >
                      {cat.name}
                    </p>
                  ))}
                </div>
              </button>
            </div>
          </div>
          <div className="w-1/3">
            <div className=" mb-4 flex flex-col gap-5 justify-start w-full">
              <label
                htmlFor="name"
                className="text-[15px] text-text text-black dark:text-white font-[400]"
              >
                Select Sub Category
                <span className="text-red-500">*</span>
              </label>
              <button
                className="bg-white dark:bg-slate-800 border text-black dark:text-white w-full border-[#d1d1d1] rounded-md justify-between px-3 py-2 flex items-center gap-8  relative cursor-pointer dropdown1"
                onClick={() => setIsActive1(!isActive)}
              >
                {subCat}
                <IoChevronDown
                  className={`${
                    isActive1 ? " rotate-[180deg]" : " rotate-0"
                  } transition-all duration-300 text-[1.2rem]`}
                />
                <div
                  className={`${
                    isActive1
                      ? " z-[1] opacity-100 scale-[1]"
                      : " z-[-1] opacity-0 scale-[0.8]"
                  } w-full absolute top-12 left-0 right-0 z-40 bg-white dark:bg-slate-900 rounded-xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out`}
                  style={{
                    boxShadow: "0 15px 60px -15px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {subCategories?.map((cat, index) => (
                    <p
                      className="py-2 px-4 text-black dark:text-white transition-all duration-200 text-left"
                      key={index}
                      onClick={(e) => {
                        setProduct({ ...product, subcategory: cat });
                        setSubCat(e.target.textContent);
                      }}
                    >
                      {cat}
                    </p>
                  ))}
                </div>
              </button>
            </div>
          </div>

          <div className="w-1/3">
            <div className="w-full">
              <label
                htmlFor="stock"
                className="text-[15px] text-text text-black dark:text-white font-[400]"
              >
                Stock
              </label>
              <input
                required
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: parseInt(e.target.value) })
                }
                type="text"
                name="stock"
                id="stock"
                placeholder="Stock"
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
              selectedImages ? "" : "border-dashed border-2 p-6"
            } rounded-lg w-full h-64 flex flex-col justify-center items-center bg-white dark:bg-slate-900`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleFileDrop}
            onDragOver={handleImageDragOver}
          >
            {selectedImages ? (
              <Flex className="items-center gap-5 flex-wrap">
                {displayImages.map((i) => (
                  <img
                    src={i}
                    alt="Preview"
                    className="w-[200px] h-[200px] object-cover rounded-lg"
                  />
                ))}
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
                      multiple
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

          {selectedImages && (
            <div className="mt-4">
              <button
                onClick={() => setSelectedImages(null)}
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

export default AddProduct;
