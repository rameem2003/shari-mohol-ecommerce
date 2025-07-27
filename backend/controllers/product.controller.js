const deleteFile = require("../helpers/deleteFile");
const path = require("path");
const productModel = require("../model/product.model");
const categoryModel = require("../model/category.model");
const reviewModel = require("../model/review.model");

/**
 * All Products
 */
const allProducts = async (req, res) => {
  try {
    let allProduct = await productModel
      .find()
      .populate("category")
      .populate("reviews");
    res.status(200).send({
      success: true,
      msg: "All Products Fetched Success",
      data: allProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Get All Feature Products
 */
const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await productModel
      .find({ featured: true })
      .populate("category")
      .populate("reviews");
    res.status(200).send({
      success: true,
      msg: "All Featured Products Fetched Success",
      data: featuredProducts,
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
 * Get All Hot Sell Products
 */
const getHotSellProducts = async (req, res) => {
  try {
    let hotSellProducts = await productModel
      .find({ hotSell: true })
      .populate("category")
      .populate("reviews");
    res.status(200).send({
      success: true,
      msg: "All Hot Sell Products Fetched Success",
      data: hotSellProducts,
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
 * Get Products by Category
 */
const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    let products = await productModel
      .find({ category })
      .populate("category")
      .populate("reviews");
    res.status(200).send({
      success: true,
      msg: `${category} Products Fetched Success`,
      data: products,
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
 * Get Products by Sub Category
 */
const getProductBySubCategory = async (req, res) => {
  const { subCategory } = req.query;
  try {
    let products = await productModel
      .find({ subCategory })
      .populate("category")
      .populate("reviews");
    res.status(200).send({
      success: true,
      msg: `${subCategory} Products Fetched Success`,
      data: products,
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
 * Single Product
 */
const singleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let product = await productModel
      .findOne({ _id: id })
      .populate("category")
      .populate("reviews");
    res.status(200).send({
      success: true,
      msg: "Product Fetched Success",
      data: product,
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
 * Create New Product
 */
const createNewProduct = async (req, res) => {
  const {
    name,
    description,
    sellingPrice,
    discountPrice,
    colors,
    sizes,
    stock,
    category,
    subCategory,
    store,
    ratings,
    reviews,
    featured,
    hotSell,
  } = req.body;

  const imagesLink = req.files.map((file) => file.filename);

  const productColors = colors
    ? colors.split(",").map((col) => col.trim())
    : [];
  const productSizes = sizes ? sizes.split(",").map((size) => size.trim()) : [];

  try {
    const newProduct = new productModel({
      name,
      description,
      sellingPrice,
      discountPrice,
      colors: productColors,
      sizes: productSizes,
      stock,
      store,
      category,
      subCategory: subCategory.toLowerCase(),
      ratings,
      reviews,
      images: imagesLink,
      featured,
      hotSell,
    });

    await newProduct.save();

    await categoryModel.findOneAndUpdate(
      { _id: category },
      { $push: { products: newProduct._id } },
      { new: true }
    );

    res.status(201).send({
      success: true,
      msg: "New Product",
      newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Update Product
 */
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateFields = {};

  // Extract only the fields that are present in the request body
  const fields = [
    "name",
    "description",
    "sellingPrice",
    "discountPrice",
    "colors",
    "sizes",
    "stock",
    "category",
    "subCategory",
    "store",
    "ratings",
    "reviews",
    "featured",
    "hotSell",
  ];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field];
    }
  });

  if (req.body.colors) {
    const colorsArray = req.body.colors.split(",").map((color) => color.trim());
    updateFields.colors = colorsArray;
  }
  if (req.body.sizes) {
    const sizesArray = req.body.sizes.split(",").map((size) => size.trim());
    updateFields.sizes = sizesArray;
  }

  // Handle images separately if they are present in the request
  if (req.files && req.files.length > 0) {
    const imagesLink = req.files.map((file) => file.filename);
    updateFields.images = imagesLink;
  }

  try {
    const targetProduct = await productModel.findOneAndUpdate(
      { _id: id },
      {
        $set: updateFields,
      }
    );

    // If images were updated, delete the old images
    if (updateFields.images) {
      let productImages = targetProduct.images;

      productImages.forEach(async (item) => {
        // let imagePath = item.split("/");
        // let oldImagePath = imagePath[imagePath.length - 1];

        try {
          await deleteFile(`${path.join(__dirname, "../temp")}/${item}`);
        } catch (fileDeleteErr) {
          // console.log(fileDeleteErr);

          return res.status(500).send({
            success: false,
            msg: "Internal Server Error",
            fileDeleteErr,
          });
        }
      });
    }

    res.status(200).send({
      success: true,
      msg: "Product is update",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Product Delete
 */
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    let targetProduct = await productModel.findByIdAndDelete({ _id: id });

    let productImages = targetProduct.images;

    productImages.forEach(async (item) => {
      // let imagePath = item.split("/");
      // let oldImagePath = imagePath[imagePath.length - 1];

      try {
        await deleteFile(`${path.join(__dirname, "../temp")}/${item}`);
      } catch (fileDeleteErr) {
        res.status(500).send({
          success: false,
          msg: "Internal Server Error",
          fileDeleteErr,
        });
      }
    });

    await categoryModel.findByIdAndUpdate(
      {
        _id: targetProduct.category,
      },
      {
        $pull: {
          products: targetProduct._id,
        },
      }
    );

    if (targetProduct.store) {
      await storeModel.findByIdAndUpdate(
        {
          _id: targetProduct.store,
        },
        {
          $pull: {
            products: targetProduct._id,
          },
        }
      );
    }

    if (targetProduct.reviews && targetProduct.reviews.length > 0) {
      // await reviewModel.deleteMany({ _id: { $in: targetProduct.reviews } });
      await reviewModel.deleteMany({ product: targetProduct._id }); // Delete reviews associated with the product
    }

    res.status(200).send({
      success: true,
      msg: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

const sendReview = async (req, res) => {
  const { user, product, rating, comment } = req.body;

  try {
    let newReview = new reviewModel({ user, product, rating, comment });

    await newReview.save();

    await productModel.findByIdAndUpdate(
      { _id: product },
      {
        $push: { reviews: newReview._id },
      },
      { new: true }
    );
    res.status(201).send({
      success: true,
      msg: "Review Added Successfully",
      data: newReview,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  allProducts,
  getFeaturedProducts,
  getHotSellProducts,
  getProductByCategory,
  getProductBySubCategory,
  singleProduct,
  createNewProduct,
  updateProduct,
  deleteProduct,
  sendReview,
};
