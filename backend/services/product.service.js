const categoryModel = require("../model/category.model");
const productModel = require("../model/product.model");
const reviewModel = require("../model/review.model");
const deleteFile = require("../utils/fileDelete");

const findAllProducts = async (param) => {
  try {
    if (param === "featured") {
      let featuredProducts = await productModel
        .find({ featured: true })
        .populate("category")
        .populate("reviews");
      return featuredProducts;
    } else if (param === "hot_sell") {
      let hotSellProducts = await productModel
        .find({ hotSell: true })
        .populate("category")
        .populate("reviews");
      return hotSellProducts;
    } else {
      let allProduct = await productModel
        .find({})
        .populate("category")
        .populate("reviews");
      return allProduct;
    }
  } catch (error) {
    console.log("Error fetching products: ", error);
    throw new Error("Error fetching products: " + error.message);
  }
};

const findProductsByCategory = async (category) => {
  try {
    let products = await productModel
      .find({ category })
      .populate("category")
      .populate("reviews");
    return products;
  } catch (error) {
    console.log("Error fetching products by category: ", error);
    throw new Error("Error fetching products by category: " + error.message);
  }
};

const findProductsBySubCategory = async (subCategory) => {
  try {
    let products = await productModel
      .find({ subCategory })
      .populate("category")
      .populate("reviews");
    return products;
  } catch (error) {
    console.log("Error fetching products by sub category: ", error);
    throw new Error(
      "Error fetching products by sub category: " + error.message
    );
  }
};

const findSingleProductById = async (id) => {
  try {
    let product = await productModel
      .findOne({ _id: id })
      .populate("category")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
        },
      });
    return product;
  } catch (error) {
    console.log("Error fetching product by id: ", error);
    throw new Error("Error fetching product by id: " + error.message);
  }
};

const addNewProduct = async (productData) => {
  try {
    const newProduct = new productModel(productData);
    await newProduct.save();

    await categoryModel.findOneAndUpdate(
      { _id: productData.category },
      { $push: { products: newProduct._id } }
    );
    return newProduct;
  } catch (error) {
    console.log("Error adding new product: ", error);
    throw new Error("Error adding new product: " + error.message);
  }
};

const updateExistingProduct = async (id, updateData, filenames) => {
  try {
    let targetProduct = await productModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...updateData, ...(filenames && { images: filenames }) } }
    );

    if (filenames) {
      // Delete old images
      targetProduct.images.forEach(async (image) => {
        await deleteFile("../uploads/products/", image);
      });
    }

    return targetProduct;
  } catch (error) {
    console.log("Error updating product: ", error);
    throw new Error("Error updating product: " + error.message);
  }
};

const deleteExistingProduct = async (id) => {
  try {
    let targetProduct = await productModel.findByIdAndDelete({ _id: id });
    targetProduct.images.forEach(async (image) => {
      await deleteFile("../uploads/products/", image);
    });

    await categoryModel.findByIdAndUpdate(
      {
        _id: targetProduct.category,
      },
      { $pull: { products: targetProduct._id } }
    );

    if (targetProduct.reviews && targetProduct.reviews.length > 0) {
      await reviewModel.deleteMany({ product: targetProduct._id }); // Delete reviews associated with the product
    }

    return targetProduct;
  } catch (error) {
    console.log("Error deleting product: ", error);
    throw new Error("Error deleting product: " + error.message);
  }
};

const reviewTheProduct = async (data) => {
  try {
    const newReview = new reviewModel(data);
    await newReview.save();

    await productModel.findOneAndUpdate(
      { _id: data.product },
      {
        $push: { reviews: newReview._id },
      },
      { new: true }
    );

    return newReview;
  } catch (error) {
    console.log("Error adding review: ", error);
    throw new Error("Error adding review: " + error.message);
  }
};

module.exports = {
  findAllProducts,
  findProductsByCategory,
  findProductsBySubCategory,
  findSingleProductById,
  addNewProduct,
  updateExistingProduct,
  deleteExistingProduct,
  reviewTheProduct,
};
