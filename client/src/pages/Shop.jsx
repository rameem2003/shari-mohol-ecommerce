import React, { useEffect, useState } from "react";
import ShopBanner from "../components/screens/shop/ShopBanner";
import Container from "../components/common/Container";
import Flex from "../components/common/Flex";
import { FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";
import PrizeRangeSlider from "../components/screens/shop/PrizeRangeSlider";
import axios from "axios";
import ProductListPagination from "../components/reusable/ProductListPagination";
import BreadCrumb from "../components/common/BreadCrumb";

const Shop = () => {
  const [filterPanel, setFilterPanel] = useState(false);
  const [range, setRange] = useState(500000);
  const categories = useSelector((state) => state.category.category); // get all categories
  const allProducts = useSelector((state) => state.allproducts.products); // get all products
  const [filter, setFilter] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // function for filter products by price and category
  const filterProducts = async (price, category, subcategory) => {
    console.log(subcategory);

    let filteredProduct = allProducts.filter(
      (item) => item.sellingPrice > 0 && item.sellingPrice <= price
    );
    if (category) {
      filteredProduct = filteredProduct.filter(
        (item) => item.category.name == category
      );
    }

    if (subcategory) {
      let res = await axios.get(
        ` ${
          import.meta.env.VITE_API
        }/product/subcategory?subCategory=${subcategory}`
      );
      //   filteredProduct = filteredProduct.filter(
      //     (item) => item.subCategory == subcategory
      //   );

      filteredProduct = res.data.data;
    }

    setFilter(filteredProduct);
  };

  // handleFilter Price
  const handleFilter = (e) => {
    setRange(e.target.value);
    filterProducts(range, selectedCategory);
  };

  // handleCategoryFilter
  const handleCategoryFilter = (cat) => {
    setSelectedCategory(cat);
    filterProducts(range, cat);
  };

  // handle subcategory filter
  const handleSubCategoryFilter = (subCat) => {
    setSelectedSubCategory(subCat);
    filterProducts(range, selectedCategory, subCat);
  };

  useEffect(() => {
    setFilter(allProducts);
  }, [allProducts]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <main>
      <ShopBanner />

      <section className=" mt-10 my-20">
        <Container>
          <Flex className={" items-center justify-between"}>
            <BreadCrumb path={"Shop"} />

            <FaFilter
              onClick={() => setFilterPanel(!filterPanel)}
              className=" block lg:hidden text-2xl hover:text-purple-700 cursor-pointer"
            />
          </Flex>

          <Flex className="items-start relative gap-4 mt-10">
            <div
              className={` duration-200 absolute top-0 ${
                filterPanel ? "left-0" : "left-[-200%]"
              }  z-50 bg-white p-2 lg:p-0 lg:static lg:w-4/12 xl:w-3/12`}
            >
              <div className="rounded-md p-10 shadow-md">
                <h2 className="mb-5 text-xl font-bold">All Categories</h2>

                <div>
                  <ul>
                    {categories.map((data, i) => (
                      <li
                        onClick={() => handleCategoryFilter(data.name)}
                        key={i}
                        className={` mb-1 cursor-pointer select-none text-[18px] hover:font-semibold `}
                      >
                        <span
                          className={
                            data.name == selectedCategory
                              ? "font-bold text-purple-500"
                              : ""
                          }
                        >
                          {data.name} ({data.products.length})
                        </span>
                        <div className=" mt-1 ml-5">
                          {data?.subCategories?.map((sc, i) => (
                            <li
                              onClick={() => handleSubCategoryFilter(sc)}
                              className=" cursor-pointer text-base capitalize hover:font-semibold hover:text-purple-700"
                              key={i}
                            >
                              {sc}
                            </li>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <PrizeRangeSlider handleFilter={handleFilter} range={range} />{" "}
            </div>
            <div className=" w-full lg:w-8/12 xl:w-9/12">
              <ProductListPagination itemsPerPage={4} products={filter} />
            </div>
          </Flex>
        </Container>
      </section>
    </main>
  );
};

export default Shop;
