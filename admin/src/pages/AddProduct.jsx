import React, { useEffect, useState } from "react";
import Flex from "../components/common/Flex";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Loader from "../components/common/Loader";
// react icons
import { IoChevronDown } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";

const AddProduct = () => {
  const accessToken = Cookies.get("accessToken"); // access token
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
  const [isLoading, setIsLoading] = useState(false);

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
      `${import.meta.env.VITE_API}/category/single/${id}`,
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
  const handleUpload = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(product);

    let data = new FormData();
    data.append("name", product.name);
    data.append("description", product.description);
    data.append("sellingPrice", product.sellingPrice);
    data.append("discountPrice", product.discountPrice);
    data.append("colors", product.colors);
    data.append("sizes", product.sizes);
    data.append("stock", product.stock);
    data.append("category", product.category);
    data.append("subCategory", product.subcategory);
    // Append each image file separately
    if (product.images) {
      for (let i = 0; i < product.images.length; i++) {
        data.append("images", product.images[i]);
      }
    }

    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/product/create`,
        data,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Cookie: `accessToken=${accessToken}`,
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
      console.log(error);
      setIsLoading(false);

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
        Add New Product
      </h2>
      {isLoading && (
        <Flex className="fixed left-0 top-0 z-[99999999] h-screen w-full items-center justify-center bg-white dark:bg-slate-900">
          <Loader />
        </Flex>
      )}

      <form action="" className="mt-10" onSubmit={handleUpload}>
        <Flex className="mb-5 items-center gap-5">
          <div className="w-1/2">
            <div className="w-full">
              <label
                htmlFor="name"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
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
                className="border-border focus:border-primary mt-1 w-full rounded-md border bg-white px-4 py-3 text-black outline-none transition-colors duration-300 dark:bg-transparent dark:text-white"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="w-full">
              <label
                htmlFor="description"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
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
                className="border-border focus:border-primary mt-1 w-full rounded-md border bg-white px-4 py-3 text-black outline-none transition-colors duration-300 dark:bg-transparent dark:text-white"
              />
            </div>
          </div>
        </Flex>

        <Flex className="mb-5 items-center gap-5">
          <div className="w-1/2">
            <div className="w-full">
              <label
                htmlFor="selling"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
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
                className="border-border focus:border-primary mt-1 w-full rounded-md border bg-white px-4 py-3 text-black outline-none transition-colors duration-300 dark:bg-transparent dark:text-white"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="w-full">
              <label
                htmlFor="discount"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
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
                className="border-border focus:border-primary mt-1 w-full rounded-md border bg-white px-4 py-3 text-black outline-none transition-colors duration-300 dark:bg-transparent dark:text-white"
              />
            </div>
          </div>
        </Flex>

        <Flex className="mb-5 items-center gap-5">
          <div className="w-1/2">
            <div className="w-full">
              <label
                htmlFor="colors"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
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
                className="border-border focus:border-primary mt-1 w-full rounded-md border bg-white px-4 py-3 text-black outline-none transition-colors duration-300 dark:bg-transparent dark:text-white"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="w-full">
              <label
                htmlFor="size"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
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
                className="border-border focus:border-primary mt-1 w-full rounded-md border bg-white px-4 py-3 text-black outline-none transition-colors duration-300 dark:bg-transparent dark:text-white"
              />
            </div>
          </div>
        </Flex>

        <Flex className="mb-5 items-center gap-5">
          <div className="w-1/3">
            <div className="mb-4 flex w-full flex-col justify-start gap-5">
              <label
                htmlFor="name"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
              >
                Select Category
                <span className="text-red-500">*</span>
              </label>
              <button
                className="dropdown relative flex w-full cursor-pointer items-center justify-between gap-8 rounded-md border border-[#d1d1d1] bg-white px-3 py-2 text-black dark:bg-slate-800 dark:text-white"
                onClick={() => setIsActive(!isActive)}
              >
                {mainCategory}
                <IoChevronDown
                  className={`${
                    isActive ? "rotate-[180deg]" : "rotate-0"
                  } text-[1.2rem] transition-all duration-300`}
                />
                <div
                  className={`${
                    isActive
                      ? "z-[1] scale-[1] opacity-100"
                      : "z-[-1] scale-[0.8] opacity-0"
                  } absolute left-0 right-0 top-12 z-40 flex w-full flex-col overflow-hidden rounded-xl bg-white transition-all duration-300 ease-in-out dark:bg-slate-900`}
                  style={{
                    boxShadow: "0 15px 60px -15px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {categories?.map((cat, index) => (
                    <p
                      className="px-4 py-2 text-left text-black transition-all duration-200 dark:text-white"
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
            <div className="mb-4 flex w-full flex-col justify-start gap-5">
              <label
                htmlFor="name"
                className="text-text text-[15px] font-[400] text-black dark:text-white"
              >
                Select Sub Category
                <span className="text-red-500">*</span>
              </label>
              <button
                className="dropdown1 relative flex w-full cursor-pointer items-center justify-between gap-8 rounded-md border border-[#d1d1d1] bg-white px-3 py-2 text-black dark:bg-slate-800 dark:text-white"
                onClick={() => setIsActive1(!isActive)}
              >
                {subCat}
                <IoChevronDown
                  className={`${
                    isActive1 ? "rotate-[180deg]" : "rotate-0"
                  } text-[1.2rem] transition-all duration-300`}
                />
                <div
                  className={`${
                    isActive1
                      ? "z-[1] scale-[1] opacity-100"
                      : "z-[-1] scale-[0.8] opacity-0"
                  } absolute left-0 right-0 top-12 z-40 flex w-full flex-col overflow-hidden rounded-xl bg-white transition-all duration-300 ease-in-out dark:bg-slate-900`}
                  style={{
                    boxShadow: "0 15px 60px -15px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {subCategories?.map((cat, index) => (
                    <p
                      className="px-4 py-2 text-left text-black transition-all duration-200 dark:text-white"
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
                className="text-text text-[15px] font-[400] text-black dark:text-white"
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
              selectedImages ? "" : "border-2 border-dashed p-6"
            } flex h-64 w-full flex-col items-center justify-center rounded-lg bg-white dark:bg-slate-900`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleFileDrop}
            onDragOver={handleImageDragOver}
          >
            {selectedImages ? (
              <Flex className="flex-wrap items-center gap-5">
                {displayImages.map((i) => (
                  <img
                    src={i}
                    alt="Preview"
                    className="h-[200px] w-[200px] rounded-lg object-cover"
                  />
                ))}
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

          {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}

          {selectedImages && (
            <div className="mt-4">
              <button
                onClick={() => setSelectedImages(null)}
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

export default AddProduct;
