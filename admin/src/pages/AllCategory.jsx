import React, { useEffect, useState } from "react";
import EditCategory from "../components/screens/categoryScreen/EditCategory";
import ListSkeleton from "../components/common/ListSkeleton";
import CategoryTable from "../components/screens/categoryScreen/CategoryTable";
import Pagination from "../components/common/Pagination";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import {
  deleteCategoryRequest,
  fetchAllCategoriesRequest,
} from "../api/category";

const AllCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // set the target category
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [offset, setOffset] = useState(
    parseInt(searchParams.get("offset")) || 1,
  );
  const [paginationData, setPaginationData] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    const params = new URLSearchParams({
      offset,
    });
    setIsLoading(true);
    new Promise((resolve) => {
      setTimeout(async () => {
        let res = await fetchAllCategoriesRequest(params);
        setCategories(res.data);
        setPaginationData(res);
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
    const params = new URLSearchParams();
    if (offset) params.set("offset", offset.toString());
    navigate(`/all-categories?${params.toString()}`);
    fetchCategories();
  }, [offset]);

  return (
    <main className="w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      <h2 className="mb-10 text-2xl font-semibold text-black dark:text-white">
        All Categories
      </h2>

      <Pagination paginationData={paginationData} setOffset={setOffset} />

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
