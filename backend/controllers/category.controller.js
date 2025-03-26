const path = require("path");
const deleteFile = require("../helpers/deleteFile");
const categoryModel = require("../model/category.model");

const allCategory = async (req, res) => {
  try {
    let allCategory = await categoryModel.find().populate("products");
    res.status(200).send({
      success: true,
      msg: "All Category Fetched Success",
      data: allCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Create new category
 */
const createNewCategory = async (req, res) => {
  const { name, description, subCategories } = req.body;
  const { filename } = req.file;

  const subcategoryArray = subCategories
    ? subCategories.split(",").map((sub) => sub.trim())
    : [];

  if (name && filename) {
    try {
      let newCategory = new categoryModel({
        name,
        description,
        subCategories: subcategoryArray,
        thumb: `${process.env.HOST_URL}${process.env.PORT}/${filename}`,
      });

      await newCategory.save();

      res.status(201).send({
        success: true,
        msg: "New Category Is Created",
        newCategory,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        msg: "Internal Server Error",
        error,
      });
    }
  } else {
    res.status(404).send({
      success: false,
      msg: "Please fill all fields",
    });
  }
};

/**
 * Single Category
 */
const singleCategory = async (req, res) => {
  const { id } = req.params;
  try {
    let category = await categoryModel
      .findOne({ _id: id })
      .populate("products");
    res.status(200).send({
      success: true,
      msg: "Category Fetched Success",
      data: category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Update Category
 */
const updateCategory = async (req, res) => {
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

  if (req.file !== undefined) {
    let imageLink = `${process.env.HOST_URL}${process.env.PORT}/${req.file.filename}`;

    updateFields.thumb = imageLink;
  }

  try {
    const targetCategory = await categoryModel.findOneAndUpdate(
      { _id: id },
      {
        $set: updateFields,
      }
    );

    // If images were updated, delete the old image
    if (updateFields.thumb) {
      let imagePath = targetCategory.thumb.split("/");
      let oldImage = imagePath[imagePath.length - 1];

      try {
        await deleteFile(`${path.join(__dirname, "../temp")}/${oldImage}`);
      } catch (fileDeleteErr) {
        res.status(500).send({
          success: false,
          msg: "Internal Server Error",
          fileDeleteErr,
        });
      }
    }

    res.status(200).send({
      success: true,
      msg: "Category is update",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Delete category
 */
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    let category = await categoryModel.findOneAndDelete({ _id: id });
    let imagePath = category.thumb.split("/");
    let oldimage = imagePath[imagePath.length - 1];

    try {
      await deleteFile(`${path.join(__dirname, "../temp")}/${oldimage}`);
      res.status(200).send({
        success: true,
        msg: "Category deleted",
        data: category,
      });
    } catch (fileDeleteErr) {
      res.status(500).send({
        success: false,
        msg: "Internal Server Error",
        fileDeleteErr,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  allCategory,
  createNewCategory,
  singleCategory,
  updateCategory,
  deleteCategory,
};
