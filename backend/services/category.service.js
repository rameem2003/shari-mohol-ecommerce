const categoryModel = require("../model/category.model");
const deleteFile = require("../utils/fileDelete");

const getAllCategories = async (limit = 0, offset) => {
  try {
    let totalCount = await categoryModel
      .countDocuments()
      .limit(limit)
      .skip(offset);
    let res = await categoryModel
      .find()
      .populate("products")
      .limit(limit)
      .skip(offset);
    return { totalCount, categories: res };
  } catch (error) {
    console.log("Error fetching categories: ", error);
    throw new Error("Error fetching categories: " + error.message);
  }
};
const findCategoryById = async (id) => {
  try {
    let res = await categoryModel.findById(id).populate("products");

    return res;
  } catch (error) {
    console.log("Error finding category: ", error);
    throw new Error("Error finding category: " + error.message);
  }
};

const uploadNewCategory = async (
  name,
  description,
  subCategories,
  filename
) => {
  try {
    let newCategory = new categoryModel({
      name,
      description,
      subCategories,
      thumb: filename,
    });
    await newCategory.save();
    return newCategory;
  } catch (error) {
    console.log("Error creating category: ", error);
    throw new Error("Error creating category: " + error.message);
  }
};

const updateExistingCategory = async (id, updateData, filename) => {
  try {
    let targetCategory = await categoryModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...updateData,
          ...(filename && { thumb: filename }),
        },
      }
    );

    if (filename) {
      await deleteFile("../uploads/categories/", targetCategory.thumb);
    }
    return targetCategory;
  } catch (error) {
    console.log("Error updating category: ", error);
    throw new Error("Error updating category: " + error.message);
  }
};

const deleteExistingCategory = async (id) => {
  try {
    let targetCategory = await categoryModel.findOneAndDelete({ _id: id });
    await deleteFile("../uploads/categories/", targetCategory.thumb);
    return targetCategory;
  } catch (error) {
    console.log("Error deleting category: ", error);
    throw new Error("Error deleting category: " + error.message);
  }
};

module.exports = {
  findCategoryById,
  getAllCategories,
  uploadNewCategory,
  updateExistingCategory,
  deleteExistingCategory,
};
