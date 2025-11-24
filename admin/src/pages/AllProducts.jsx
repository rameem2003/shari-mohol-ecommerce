import React, { useEffect, useState } from "react";
import ProductCard from "../components/common/ProductCard";
import Flex from "../components/common/Flex";
import EditProduct from "../components/screens/productScreen/EditProduct";
import ProductListSkeleton from "../components/screens/productsScreen/ProductListSkeleton";
import ProductFIlter from "../components/screens/productsScreen/ProductFIlter";
import { fetchAllProductsRequest, updateProductRequest } from "../api/product";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [price, setPrice] = useState(searchParams.get("price") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [segment, setSegment] = useState(searchParams.get("segment") || "");
  const [offset, setOffset] = useState(
    parseInt(searchParams.get("offset")) || 1,
  );
  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // set the target product
  const [isLoading, setIsLoading] = useState(false);

  // fetch all products
  const fetchAllProducts = async () => {
    const params = new URLSearchParams({
      category,
      price,
      segment,
      offset,
    });
    setIsLoading(true);
    new Promise((resolve) => {
      setTimeout(async () => {
        let res = await fetchAllProductsRequest(params);
        setAllProducts(res.data);
        setIsLoading(false);
      }, 1000);
    });
  };

  const toggleActionMenu = (id) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  // function for edit modal
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // function for product feature update
  const handleFeaturedUpdate = async (e, id) => {
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("featured", e.target.checked);

      await updateProductRequest(id, formDataToSend);

      toast.success("Product featured status updated successfully");
      setIsLoading(false);
      await fetchAllProducts();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // function for product hotSell update
  const handleHotSellUpdate = async (e, id) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("hotSell", e.target.checked);

      await updateProductRequest(id, formDataToSend);

      toast.success("Product hot sell status updated successfully");
      setIsLoading(false);
      await fetchAllProducts();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async (product) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", product.name);
      formDataToSend.append("description", product.description);
      formDataToSend.append("sellingPrice", product.sellingPrice);
      formDataToSend.append("discountPrice", product.discountPrice);
      formDataToSend.append("colors", product.colors);
      formDataToSend.append("sizes", product.sizes);
      formDataToSend.append("stock", product.stock);
      if (product.images) {
        for (let i = 0; i < product.images.length; i++) {
          formDataToSend.append("images", product.images[i]);
        }
      }

      const res = await updateProductRequest(
        selectedProduct._id,
        formDataToSend,
      );

      setIsLoading(false);
      if (!res.success) {
        toast.error(res.response.data.message);
        return;
      }
      toast.success(res.message);

      await fetchAllProducts();

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.response.data.message);
      handleClose();
    }
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if (price) params.set("price", price);
    if (offset) params.set("offset", offset.toString());
    if (segment) params.set("segment", segment);
    // console.log(params);

    navigate(`/all-products?${params.toString()}`);
    fetchAllProducts();
  }, [price, category, segment, offset]);

  return (
    <main className="w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      <h2 className="mb-10 text-2xl font-semibold text-black dark:text-white">
        All Products
      </h2>
      <ProductFIlter
        setPrice={setPrice}
        setCategory={setCategory}
        setSegment={setSegment}
      />

      {isLoading && <ProductListSkeleton />}
      {/* Product List Pagination */}
      <section className="mt-10">
        <Flex className="flex-wrap justify-between">
          {/* Product List Display */}
          {!isLoading &&
            allProducts.map((p, index) => (
              <ProductCard
                data={p}
                handleEdit={handleEdit}
                handleFeaturedUpdate={handleFeaturedUpdate}
                handleHotSellUpdate={handleHotSellUpdate}
                onUpdate={fetchAllProducts}
                className="w-full md:w-[48%] lg:w-[32%] 2xl:w-[24%]"
              />
            ))}
        </Flex>
      </section>

      <EditProduct
        isModalOpen={isModalOpen}
        selectedProduct={selectedProduct}
        handleClose={() => setIsModalOpen(false)}
        onUpdate={fetchAllProducts}
        handleUpdate={handleUpdate}
      />
    </main>
  );
};

export default AllProducts;
