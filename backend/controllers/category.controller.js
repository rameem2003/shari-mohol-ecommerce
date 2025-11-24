const {
  getAllCategories,
  findCategoryById,
  uploadNewCategory,
  updateExistingCategory,
  deleteExistingCategory,
} = require("../services/category.service");
const {
  categoryUploadValidator,
  categorySegmentSchema,
} = require("../validator/category.validator");
const deleteFile = require("../utils/fileDelete");

/**
 * Get all category
 */
const allCategory = async (req, res) => {
  const { data, error } = categorySegmentSchema.safeParse(req.query);
  if (error) {
    return res
      .status(400)
      .send({ success: false, message: JSON.parse(error.message)[0].message });
  }

  const { limit, offset } = data;

  try {
    let { totalCount, categories } = await getAllCategories(
      limit,
      (offset - 1) * 10
    );
    const totalPages = Math.ceil(totalCount / 10);
    res.status(200).send({
      success: true,
      message: "All Category Fetched Success",
      data: categories,
      totalCount,
      totalPages,
      currentPage: offset,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

/**
 * Get single category controller
 */
const getSingleCategory = async (req, res) => {
  const { id } = req.params;

  try {
    let data = await findCategoryById(id);
    res.status(200).send({
      success: true,
      message: "Category fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching category",
      error: error.message,
    });
  }
};

/**
 * Create new category
 */
const createNewCategory = async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
  const { data, error } = categoryUploadValidator.safeParse(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: JSON.parse(error.message)[0].message });
  }
  const filename = req?.file?.filename || "";

  const subcategoryArray = data.subCategories
    ? data.subCategories.split(",").map((sub) => sub.trim())
    : [];

  try {
    if (filename) {
      let newCategory = await uploadNewCategory(
        data.name,
        data.description,
        subcategoryArray,
        filename
      );
      return res.status(201).send({
        success: true,
        message: "New Category Is Created",
        newCategory,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Please fill all fields",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

/**
 * Update Category
 */
const updateCategory = async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
  const { id } = req.params;

  const updateFields = {};

  // Extract only the fields that are present in the request body
  const fields = ["name", "description", "subCategories"];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field];
    }
  });

  if (req.body.subCategories) {
    const subcategoryArray = req.body.subCategories
      .split(",")
      .map((sub) => sub.trim());
    updateFields.subCategories = subcategoryArray;
  }

  try {
    let targetCategory = await updateExistingCategory(
      id,
      updateFields,
      req?.file?.filename
    );

    return res.status(200).send({
      success: true,
      message: "Category is update",
      targetCategory,
    });
  } catch (error) {
    await deleteFile("../uploads/categories/", req?.file?.filename);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

/**
 * Delete category
 */
const deleteCategory = async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
  const { id } = req.params;

  try {
    let targetCategory = await deleteExistingCategory(id);

    return res.status(200).send({
      success: true,
      message: "Category is deleted",
      targetCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  allCategory,
  createNewCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
