const router = require("express").Router();
const auth = require("./auth");
const banner = require("./banner");
const category = require("./category");
const base = process.env.BASE_URL;

/**
 * Auth Route
 * http:localhost:5000/api/v1/auth
 */
router.use(base, auth);

/**
 * Banner Route
 * http:localhost:5000/api/v1/banner
 */
router.use(base, banner);
/**
 * Banner Route
 * http:localhost:5000/api/v1/category
 */
router.use(base, category);

module.exports = router;
