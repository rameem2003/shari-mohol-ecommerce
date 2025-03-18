import React, { useEffect, useState } from "react";
import ProductCard from "../components/common/ProductCard";
import axios from "axios";
import ProductListPagination from "../components/screens/productsScreen/ProductListPagination";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  // fetch all products
  const fetchAllProducts = async () => {
    let res = await axios.get(`${import.meta.env.VITE_API}/product/all`);
    setAllProducts(res.data.data);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <main className="w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      <h2 className="text-2xl font-semibold text-black dark:text-white">
        All Products
      </h2>

      {/* Product List Pagination */}
      <section className="mt-10">
        <ProductListPagination itemsPerPage={6} products={allProducts} />
      </section>
    </main>
  );
};

export default AllProducts;
