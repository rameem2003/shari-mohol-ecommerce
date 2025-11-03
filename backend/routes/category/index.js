const {
  allCategory,
  singleCategory,
  createNewCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/category.controller");
const checkAdminMiddleware = require("../../middlewares/checkAdminMiddleware");
const errorHandleMiddleware = require("../../middlewares/errorHandleMiddleware");
const createUploadMiddleware = require("../../middlewares/fileupload");
const upload = createUploadMiddleware({ type: "category" });

const router = require("express").Router();

/**
 * Get all category
 * http://localhost:5000/api/v1/category/all
 */
router.get("/category/all", allCategory);

/**
 * Get single category
 * http://localhost:5000/api/v1/category/single/:id
 */
router.get("/category/single/:id", singleCategory);

/**
 * Create new category
 * http://localhost:5000/api/v1/category/create
 */
router.post(
  "/category/create",
  checkAdminMiddleware,
  upload.single("image"),
  errorHandleMiddleware,
  createNewCategory
);

/**
 * Update category
 * http://localhost:5000/api/v1/category/update/:id
 */
router.patch(
  "/category/update/:id",
  checkAdminMiddleware,
  upload.single("image"),
  errorHandleMiddleware,
  updateCategory
);

/**
 * Delete category
 * http://localhost:5000/api/v1/category/delete/:id
 */
router.delete("/category/delete/:id", checkAdminMiddleware, deleteCategory);

module.exports = router;
