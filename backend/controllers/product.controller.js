const {
  productSegmentSchema,
  newProductValidationSchema,
  productReviewValidationSchema,
} = require("../validator/product.validator");
const {
  findAllProducts,
  findProductsByCategory,
  findProductsBySubCategory,
  findSingleProductById,
  addNewProduct,
  updateExistingProduct,
  deleteExistingProduct,
  reviewTheProduct,
} = require("../services/product.service");

/**
 * All Products
 */
const allProducts = async (req, res) => {
  const { data, error } = productSegmentSchema.safeParse(req.query);
  if (error) {
    return res
      .status(400)
      .send({ success: false, message: JSON.parse(error.message)[0].message });
  }

  const { segment, limit, offset } = data;
  try {
    let { totalCount, products } = await findAllProducts(
      segment,
      limit,
      (offset - 1) * 10
    );

    const totalPages = Math.ceil(totalCount / 10);

    res.status(200).send({
      success: true,
      message: "All Products Fetched Success",
      currentPage: offset,
      totalPages,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
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
    let products = await findProductsByCategory(category);
    res.status(200).send({
      success: true,
      message: `${category} Products Fetched Success`,
      data: products,
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
 * Get Products by Sub Category
 */
const getProductBySubCategory = async (req, res) => {
  const { subCategory } = req.query;
  try {
    let products = await findProductsBySubCategory(subCategory);
    res.status(200).send({
      success: true,
      message: `${subCategory} Products Fetched Success`,
      data: products,
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
 * Single Product
 */
const singleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let product = await findSingleProductById(id);
    res.status(200).send({
      success: true,
      message: "Product Fetched Success",
      data: product,
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
 * Create New Product
 */
const createNewProduct = async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }

  const { data, error } = newProductValidationSchema.safeParse(req.body);

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: JSON.parse(error.message)[0].message });
  }

  const images = req?.files?.map((file) => file.filename);

  const productColors = data.colors
    ? data.colors.split(",").map((col) => col.trim())
    : [];
  const productSizes = data.sizes
    ? data.sizes.split(",").map((size) => size.trim())
    : [];

  try {
    if (images.length > 0) {
      let newProduct = {
        name: data.name,
        description: data.description,
        sellingPrice: data.sellingPrice,
        discountPrice: data.discountPrice,
        colors: productColors,
        sizes: productSizes,
        stock: data.stock,
        category: data.category,
        subCategory: data.subCategory.toLowerCase(),
        images: images,
        featured: data.featured,
        hotSell: data.hotSell,
      };

      let product = await addNewProduct(newProduct);

      res.status(201).send({
        success: true,
        message: "New Product",
        data: product,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "At least one product image is required",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

/**
 * Update Product
 */
const updateProduct = async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }

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
    "featured",
    "hotSell",
  ];

  let images = null;

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
    images = req.files.map((file) => file.filename);
  }

  try {
    let targetProduct = await updateExistingProduct(id, updateFields, images);

    res.status(200).send({
      success: true,
      message: "Product is update",
      data: targetProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

/**
 * Product Delete
 */
const deleteProduct = async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }

  const { id } = req.params;

  try {
    let targetProduct = await deleteExistingProduct(id);

    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
      data: targetProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

const sendReview = async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
  const { data, error } = productReviewValidationSchema.safeParse(req.body);

  if (error) {
    console.log(error);

    return res
      .status(400)
      .json({ success: false, message: JSON.parse(error.message)[0].message });
  }

  try {
    let newReview = await reviewTheProduct({ ...data, user: req.user.id });

    res.status(201).send({
      success: true,
      message: "Review Added Successfully",
      data: newReview,
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
  allProducts,
  getProductByCategory,
  getProductBySubCategory,
  singleProduct,
  createNewProduct,
  updateProduct,
  deleteProduct,
  sendReview,
};
