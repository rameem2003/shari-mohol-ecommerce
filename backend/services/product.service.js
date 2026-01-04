const categoryModel = require("../model/category.model");
const productModel = require("../model/product.model");
const reviewModel = require("../model/review.model");
const deleteFile = require("../utils/fileDelete");

const findAllProducts = async (
  param,
  category = "",
  price = "asc",
  limit = 10,
  offset = 0
) => {
  try {
    let totalCount = await productModel.countDocuments();

    let categoryProducts = await productModel
      .find({
        ...(category && { category }),
        ...(param && {
          [param === "featured" ? "featured" : "hotSell"]: true,
        }),
      })
      .populate("category")
      .populate("reviews")
      .sort({ sellingPrice: price === "asc" || price === "" ? 1 : -1 })
      .limit(limit)
      .skip(offset);
    return { totalCount, products: categoryProducts };

    // if (param === "featured") {
    //   let featuredProducts = await productModel
    //     .find({ featured: true })
    //     .populate("category")
    //     .populate("reviews")
    //     .limit(limit || 0)
    //     .skip(offset || 0);
    //   return { totalCount, products: featuredProducts };
    // } else if (param === "hot_sell") {
    //   let hotSellProducts = await productModel
    //     .find({ hotSell: true })
    //     .populate("category")
    //     .populate("reviews")
    //     .limit(limit || 0)
    //     .skip(offset || 0);
    //   return { totalCount, products: hotSellProducts };
    // }
    // else {
    //   let allProduct = await productModel
    //     .find({})
    //     .populate("category")
    //     .populate("reviews")
    //     .limit(limit || 0)
    //     .skip(offset || 0);
    //   return { totalCount, products: allProduct };
    // }
  } catch (error) {
    console.log("Error fetching products: ", error);
    throw new Error("Error fetching products: " + error.message);
  }
};

const findProductsByCategory = async (
  param,
  category = "",
  price = "asc",
  limit = 10,
  offset = 0
) => {
  try {
    let totalCount = await productModel.countDocuments({ category });
    let products = await productModel
      .find({
        category,
        ...(param && {
          [param === "featured" ? "featured" : "hotSell"]: true,
        }),
      })
      .populate("category")
      .populate("reviews")
      .sort({ sellingPrice: price === "asc" || price === "" ? 1 : -1 })
      .limit(limit || 0)
      .skip(offset || 0);
    return { totalCount, products };
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
const findProductsBySearchQuery = async (searchQuery) => {
  try {
    let products = await productModel
      .find({ name: { $regex: searchQuery, $options: "i" } })
      .populate("category")
      .populate("reviews");
    return products;
  } catch (error) {
    console.log("Error fetching products by search query: ", error);
    throw new Error(
      "Error fetching products by search query: " + error.message
    );
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

const mostSellAndViewedProducts = async () => {
  try {
    const mostSellingProducts = await productModel
      .find({})
      .populate("category")
      .populate("reviews")
      .sort({ sellCount: -1 })
      .limit(5);

    const mostViewedProducts = await productModel
      .find({})
      .populate("category")
      .populate("reviews")
      .sort({ viewCount: -1 })
      .limit(5);

    return { mostSellingProducts, mostViewedProducts };
  } catch (error) {
    console.log("Error fetching products: ", error);
    throw new Error("Error fetching products: " + error.message);
  }
};

module.exports = {
  findAllProducts,
  findProductsByCategory,
  findProductsBySubCategory,
  findSingleProductById,
  findProductsBySearchQuery,
  addNewProduct,
  updateExistingProduct,
  deleteExistingProduct,
  reviewTheProduct,
  mostSellAndViewedProducts,
};
