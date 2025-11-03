const {
  allBanner,
  addNewBanner,
  deleteBanner,
} = require("../../controllers/banner.controller");
const checkAdminMiddleware = require("../../middlewares/checkAdminMiddleware");
const errorHandleMiddleware = require("../../middlewares/errorHandleMiddleware");
const createUploadMiddleware = require("../../middlewares/fileupload");
const upload = createUploadMiddleware({ type: "banner" });

const router = require("express").Router();

/**
 * Get all banners
 * http://localhost:5000/api/v1/banner/all
 */
router.get("/banner/all", allBanner);

/**
 * Add new banner
 * http://localhost:5000/api/v1/banner/create
 */
router.post(
  "/banner/create",
  checkAdminMiddleware,
  upload.single("banner"),
  errorHandleMiddleware,
  addNewBanner
);

/**
 * Delete banner
 * http://localhost:5000/api/v1/banner/delete/:id
 */
router.delete("/banner/delete/:id", checkAdminMiddleware, deleteBanner);

module.exports = router;
