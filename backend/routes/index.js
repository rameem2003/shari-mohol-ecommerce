const router = require("express").Router();
const auth = require("./auth");
const base = process.env.BASE_URL;

/**
 * Auth Route
 * http:localhost:5000/api/v1/auth
 */
router.use(base, auth);

module.exports = router;
