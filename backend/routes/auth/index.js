const {
  registerUser,
  loginUser,
  singleUser,
  updateUser,
  verifyOTP,
  resendOTP,
  verifyAdmin,
  verifyUser,
  allusers,
  logoutUser,
  changePassword,
  deleteUser,
  forgetPassword,
} = require("../../controllers/auth.controller");
const checkAdminMiddleware = require("../../middlewares/checkAdminMiddleware");
const checkUserMiddleware = require("../../middlewares/checkUserMiddleware");
const errorHandleMiddleware = require("../../middlewares/errorHandleMiddleware");
const upload = require("../../middlewares/fileupload");

const router = require("express").Router();

/**
 * Register Route
 * http://localhost:5000/api/v1/auth/register
 */
router.post("/auth/register", registerUser);

/**
 * Login Route
 * http://localhost:5000/api/v1/auth/login
 */
router.post("/auth/login", loginUser);

/**
 * Logout Route
 * http://localhost:5000/api/v1/auth/logout/:id
 */
router.post("/auth/logout/:id", checkUserMiddleware, logoutUser);

/**
 * Single User Info
 * http://localhost:5000/api/v1/auth/user/:id
 */
router.get("/auth/user/:id", singleUser);

/**
 * User Profile Info Update Route
 * http://localhost:5000/api/v1/auth/update/:id
 */
router.patch(
  "/auth/update/:id",
  checkUserMiddleware,
  upload.single("photo"),
  errorHandleMiddleware,
  updateUser
);

/**
 * Change Password Route
 * http://localhost:5000/api/v1/auth/changepassword/:id
 */
router.patch("/auth/changepassword/:id", checkUserMiddleware, changePassword);

/**
 * Forget Password Route
 * http://localhost:5000/api/v1/auth/forgetpassword/:email
 */
router.patch("/auth/forgetpassword/:email", forgetPassword);

/**
 * OTP Verification Route
 * http://localhost:5000/api/v1/auth/otp-verify
 */
router.post("/auth/otp-verify", verifyOTP);

/**
 * OTP Resend Route
 * http://localhost:5000/api/v1/auth/otp-resend
 */
router.post("/auth/otp-resend", resendOTP);

/**
 * Admin Token Validation Check
 * http://localhost:5000/api/v1/auth/verify-admin
 */
router.get("/auth/verify-admin", checkAdminMiddleware, verifyAdmin);

/**
 * User Token Validation Check
 * http://localhost:5000/api/v1/auth/verify-user
 */
router.get("/auth/verify-user", checkUserMiddleware, verifyUser);

/**
 * Users Route
 * http://localhost:5000/api/v1/auth/users
 */
router.get("/auth/users", checkAdminMiddleware, allusers);

/**
 * Delete User Route
 * http://localhost:5000/api/v1/auth/delete/:id
 */
router.delete("/auth/delete/:id", checkAdminMiddleware, deleteUser);

module.exports = router;
