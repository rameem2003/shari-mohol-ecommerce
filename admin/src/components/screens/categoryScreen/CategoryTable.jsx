import React, { Suspense } from "react";
import ListCategory from "./ListCategory";

const CategoryTable = ({
  categories,
  openActionMenuId,
  toggleActionMenu,
  handleDelete,
  handleEdit,
}) => {
  return (
    <div className="customTable w-full rounded-md">
      <table className="w-full text-sm">
        <thead className="bg-gray-200 dark:bg-slate-900">
          <tr>
            <th className="p-3 text-left font-medium text-black dark:text-white">
              Image
            </th>
            <th className="p-3 text-left font-medium text-black dark:text-white">
              Category Name
            </th>
            <th className="p-3 text-left font-medium text-black dark:text-white">
              Sub Categories
            </th>
            <th className="p-3 text-left font-medium text-black dark:text-white">
              Total Items
            </th>

            <th className="p-3 text-left font-medium text-black dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="">
          {categories?.map((item) => (
            <ListCategory
              key={item._id}
              item={item}
              openActionMenuId={openActionMenuId}
              toggleActionMenu={toggleActionMenu}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>

      {!categories?.length && (
        <p className="w-full py-6 text-center text-[0.9rem] text-gray-500">
          No data found!
        </p>
      )}
    </div>
  );
};

export default CategoryTable;
