const {
  registerUser,
  loginUser,
  singleUser,
  updateUser,
  allusers,
  logoutUser,
  changePassword,
  sendEmailVerificationToken,
  verifyEmailToken,
  sendResetPasswordToken,
  verifyResetPasswordToken,
  resetPassword,
  updateUserRole,
  fetchCustomer,
} = require("../../controllers/auth.controller");
const checkAdminMiddleware = require("../../middlewares/checkAdminMiddleware");
const checkUserMiddleware = require("../../middlewares/checkUserMiddleware");
const errorHandleMiddleware = require("../../middlewares/errorHandleMiddleware");
const createUploadMiddleware = require("../../middlewares/fileupload");
const upload = createUploadMiddleware({ type: "photo" });

const router = require("express").Router();

/**
 * Users Route
 * http://localhost:5000/api/v1/auth/users
 */
router.get("/auth/users", checkAdminMiddleware, allusers);

/**
 * Fetch Customer Information by ID
 * http://localhost:5000/api/v1/auth/user/:id
 */
router.get("/auth/user/:id", checkAdminMiddleware, fetchCustomer);

/**
 * Login Route
 * http://localhost:5000/api/v1/auth/login
 */
router.post("/auth/login", loginUser);

/**
 * Register Route
 * http://localhost:5000/api/v1/auth/register
 */
router.post("/auth/register", registerUser);

/**
 * Single User Info
 * http://localhost:5000/api/v1/auth/user
 */
router.get("/auth/user", checkUserMiddleware, singleUser);

/**
 * User Profile Info Update Route
 * http://localhost:5000/api/v1/auth/update
 */
router.patch(
  "/auth/update",
  checkUserMiddleware,
  upload.single("photo"),
  errorHandleMiddleware,
  updateUser
);

/**
 * Change Password Route
 * http://localhost:5000/api/v1/auth/changepassword/:id
 */
router.patch("/auth/changepassword", checkUserMiddleware, changePassword);

/**
 * Logout Route
 * http://localhost:5000/api/v1/auth/logout
 */
router.post("/auth/logout", checkUserMiddleware, logoutUser);

/**
 * Forget Password Route
 * http://localhost:5000/api/v1/auth/reset-password/
 */
router.post("/auth/reset-password", sendResetPasswordToken);

/**
 * Verify reset password token route
 * https://localhost:5000/api/v1/auth/reset-password-verify
 */
router.get("/auth/reset-password-verify/:token", verifyResetPasswordToken);

/**
 * Password reset route
 * https://localhost:5000/api/v1/auth/reset-password/:token
 */
router.post("/auth/reset-password/:token", resetPassword);

/**
 * Send email verification token route
 * https://localhost:5000/api/v1/auth/send-email-verification
 */
router.post(
  "/auth/send-email-verification",
  checkUserMiddleware,
  sendEmailVerificationToken
);

/**
 * Verify email token route
 * https://localhost:5000/api/v1/auth/verify-email
 */
router.get("/auth/verify-email", verifyEmailToken);

/**
 * Update User Role Route
 * http://localhost:5000/api/v1/auth/update-user-role/:id
 */
router.patch(
  "/auth/update-user-role/:id",
  checkAdminMiddleware,
  updateUserRole
);

module.exports = router;
