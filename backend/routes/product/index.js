const {
  allProducts,
  getFeaturedProducts,
  getHotSellProducts,
  singleProduct,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProductBySubCategory,
  getProductByCategory,
  sendReview,
} = require("../../controllers/product.controller");
const checkAdminMiddleware = require("../../middlewares/checkAdminMiddleware");
const checkUserMiddleware = require("../../middlewares/checkUserMiddleware");
const errorHandleMiddleware = require("../../middlewares/errorHandleMiddleware");
const createUploadMiddleware = require("../../middlewares/fileupload");
const upload = createUploadMiddleware({ type: "product" });

const router = require("express").Router();

/**
 * Get all products
 * http://localhost:5000/api/v1/product/all
 */
router.get("/products", allProducts);

/**
 * Get products by category
 * http://localhost:5000/api/v1/product/category/:category
 */
router.get("/product/category/:category", getProductByCategory);

/**
 * Get products by sub category
 * http://localhost:5000/api/v1/product/subcategory?:subCategory
 */
router.get("/product/subcategory?:subCategory", getProductBySubCategory);

/**
 * Get single product
 * http://localhost:5000/api/v1/product/single/:id
 */
router.get("/product/single/:id", singleProduct);

/**
 * Create new product
 * http://localhost:5000/api/v1/product/create
 */
router.post(
  "/product/create",
  checkAdminMiddleware,
  upload.array("images"),
  errorHandleMiddleware,
  createNewProduct
);

/**
 * Update product
 * http://localhost:5000/api/v1/product/update/:id
 */
router.patch(
  "/product/update/:id",
  checkAdminMiddleware,
  upload.array("images"),
  errorHandleMiddleware,
  updateProduct
);

/**
 * Delete product
 * http://localhost:5000/api/v1/product/delete/:id
 */
router.delete("/product/delete/:id", checkAdminMiddleware, deleteProduct);

/**
 * Send review for a product
 * http://localhost:5000/api/v1/product/review/
 */
router.post("/product/send-review", checkUserMiddleware, sendReview);

module.exports = router;
