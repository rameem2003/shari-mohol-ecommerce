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
    <main className="bg-white dark:bg-slate-900 border-l-[1px] border-black p-2 dark:border-white w-full overflow-y-scroll">
      <h2 className=" text-black dark:text-white text-2xl font-semibold">
        All Products
      </h2>

      <section className="mt-10 ">
        <ProductListPagination itemsPerPage={6} products={allProducts} />
      </section>
    </main>
  );
};

export default AllProducts;
