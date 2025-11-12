import React, { Suspense, useEffect, useState } from "react";
import EditCategory from "../components/screens/categoryScreen/EditCategory";
import {
  deleteCategoryRequest,
  fetchAllCategoriesRequest,
} from "../api/category";
import { toast } from "react-toastify";
import ListCategory from "../components/screens/categoryScreen/ListCategory";
import CategoryTable from "../components/screens/categoryScreen/CategoryTable";
import Flex from "../components/common/Flex";
import Loader from "../components/common/Loader";
import ListSkeleton from "../components/common/ListSkeleton";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // set the target category
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    setIsLoading(true);
    new Promise((resolve) => {
      setTimeout(async () => {
        let res = await fetchAllCategoriesRequest();
        setCategories(res.data);
        setIsLoading(false);
      }, 5000);
    });
  };

  const toggleActionMenu = (id) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  // function for edit modal
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  // on update
  const handleUpdate = async () => {
    // Fetch updated category list logic
    setIsModalOpen(false);
    await fetchCategories();
  };

  // handle delete
  const handleDelete = async (id) => {
    setIsLoading(true);
    console.log("Delete:", id);

    try {
      let res = await deleteCategoryRequest(id);
      setIsLoading(false);
      if (!res.success) {
        toast.error(res.response.data.message);
        return;
      }
      toast.success(res.message);
      await fetchCategories();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const handleCLick = (event) => {
      if (
        !event.target.closest(".zenui-table") &&
        !event.target.closest(".action-btn")
      ) {
        setOpenActionMenuId(null);
      }
    };
    document.addEventListener("click", handleCLick);
    return () => document.removeEventListener("click", handleCLick);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <main className="w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      <h2 className="mb-10 text-2xl font-semibold text-black dark:text-white">
        All Categories
      </h2>

      {isLoading && <ListSkeleton />}
      {!isLoading && (
        <CategoryTable
          categories={categories}
          openActionMenuId={openActionMenuId}
          toggleActionMenu={toggleActionMenu}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}

      {/* Edit Modal */}
      <EditCategory
        isModalOpen={isModalOpen}
        selectedCategory={selectedCategory}
        handleClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdate}
      />
    </main>
  );
};

export default AllCategory;
