const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const checkEmailValid = require("../helpers/checkEmailValid");
const sendOtpEmail = require("../helpers/sendOtpEmail");
const sendWelcomeNoteEmail = require("../helpers/sendWelcomeNote");
const generateOTP = require("../helpers/generateOTP");
const deleteFile = require("../helpers/deleteFile");
const authModel = require("../model/auth.model");
const otpModel = require("../model/otp.model");
const sessionModel = require("../model/session.model");
const {
  loginValidator,
  registrationValidator,
  changePasswordValidator,
  emailVerificationValidator,
} = require("../validator/auth.validator");
const {
  findUserByEmail,
  verifyPassword,
  authenticateUser,
  clearSession,
  createNewUser,
  hashedPassword,
  findUserById,
  updateUserPassword,
  createRandomToken,
  saveVerificationToken,
  createEmailLink,
  validateVerificationToken,
  findUserAndUpdateEmailVerification,
  clearTokenSchema,
} = require("../services/auth.service");
const sendEmail = require("../utils/email");

/**
 * user register complete
 */
const registerUser = async (req, res) => {
  // const { name, email, password, role } = req.body;
  const { data, error } = registrationValidator.safeParse(req.body);

  console.log(error);

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: JSON.parse(error.message)[0].message });
  }

  let existUser = await findUserByEmail(data.email);

  if (existUser) {
    return res
      .status(400)
      .send({ success: false, message: "User already exist" });
  }
  let hashPassword = await hashedPassword(data.password);

  let user = await createNewUser({
    name: data.name,
    email: data.email,
    password: hashPassword,
    role: data.role,
    phone: data.phone,
  });

  return res
    .status(200)
    .send({ success: true, message: "User created successfully", user });
};

/**
 * user login complete
 */
const loginUser = async (req, res) => {
  const { data, error } = loginValidator.safeParse(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: JSON.parse(error.message)[0].message });
  }

  let user = await findUserByEmail(data.email);

  if (!user) {
    return res.status(400).send({ success: false, message: "User not found" });
  }

  let isPasswordMatch = await verifyPassword(data.password, user.password);

  if (!isPasswordMatch) {
    return res
      .status(400)
      .send({ success: false, message: "Invalid credentials" });
  }

  let authdata = await authenticateUser({ req, res, user });

  return res
    .status(200)
    .send({ success: true, message: "Login successful", data: authdata });
};

/**
 * user logout complete
 */
const logoutUser = async (req, res) => {
  if (!req.user)
    return res.status(400).send({ success: false, message: "User not found" });

  try {
    await clearSession(req.user.session);
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong Please Try Again",
      error,
    });
  }
};

/**
 * Change Password Complete
 */
const changePassword = async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }

  const { data, error } = changePasswordValidator.safeParse(req.body);

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: JSON.parse(error.message)[0].message });
  }

  let userExist = await findUserById(req.user.id);

  if (!userExist) {
    return res.status(400).send({ success: false, message: "User not found" });
  }

  let isPasswordMatch = await verifyPassword(
    data.oldPassword,
    userExist.password
  );

  if (!isPasswordMatch) {
    return res
      .status(400)
      .send({ success: false, message: "Invalid password" });
  }

  let hashPassword = await hashedPassword(data.newPassword);

  await updateUserPassword(req.user.id, hashPassword);

  return res
    .status(200)
    .send({ success: true, message: "Password changed successfully" });
};

/**
 * Send email verification controller complete
 */
const sendEmailVerificationToken = async (req, res) => {
  if (!req.user)
    return res.status(400).send({ success: false, message: "User not found" });

  if (req.user.isVerified)
    return res
      .status(400)
      .send({ success: false, message: "User already verified" });
  try {
    const exist = await findUserById(req.user.id);

    if (!exist) {
      return res
        .status(400)
        .send({ success: false, message: "User not found" });
    }
    let randomToken = createRandomToken();

    await saveVerificationToken(exist._id, randomToken);

    let emailLink = createEmailLink(exist.email, randomToken);

    let emailBody = `
    <p>Click the link below to verify your email:</p>
    <a href="${emailLink}">${emailLink}</a> or copy and paste it this code <b>${randomToken}</b> into your browser.`;

    await sendEmail(exist.email, "Email Verification", emailBody);

    return res
      .status(200)
      .send({ success: true, message: "Email sent successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

/**
 * Token verification controller complete
 */
const verifyEmailToken = async (req, res) => {
  const { data, error } = emailVerificationValidator.safeParse(req.query);

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: JSON.parse(error.message)[0].message });
  }

  try {
    const userExist = await findUserByEmail(data.email);

    if (!userExist) {
      return res
        .status(400)
        .send({ success: false, message: "User not found" });
    }

    let validateToken = await validateVerificationToken(
      userExist._id,
      data.token
    );

    if (!validateToken) {
      return res.status(400).send({ success: false, message: "Invalid token" });
    }

    await findUserAndUpdateEmailVerification(validateToken.userID);
    await clearTokenSchema(validateToken._id);

    return res
      .status(200)
      .send({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

// complete this point

/**
 * refresh token
 */
const accessToken = async (req, res) => {
  try {
    const { sessionToken } = req.body;
    if (!sessionToken)
      return res
        .status(401)
        .send({ success: false, msg: "Session Token Required" });

    jwt.verify(sessionToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res
          .status(403)
          .json({ success: false, msg: "Invalid Session Token" });

      const user = await authModel.findOne(decoded.email);
      if (!user || user.sessionToken !== sessionToken) {
        return res
          .status(403)
          .json({ success: false, msg: "Invalid Session Token" });
      }

      let existUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        photo: user.photo,
        verified: user.isVarify,
      };

      // Create Access Token (Short-lived)
      const accessToken = jwt.sign(
        existUser,
        process.env.JWT_SECRET,
        { expiresIn: "15m" } // Expires in 15 minutes
      );

      // Create Session Token (Long-lived)
      const newSessionToken = jwt.sign(
        { email: existUser.email },
        process.env.SESSION_SECRET,
        { expiresIn: "7d" } // Expires in 7 days
      );

      user.sessionToken = newSessionToken;
      await user.save();
      res.cookie("accessToken", accessToken, {
        // httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 900000, //  15 min
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

/**
 * OTP Verification
 */
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const existingUser = await authModel.findOne({ email });

  // if email is found
  if (existingUser) {
    let userOTP = await otpModel.findOne({ email });

    // if otp is matched
    if (userOTP.otp == otp) {
      existingUser.isVarify = true; // change the verify state to true
      await existingUser.save();

      res.status(200).send({
        success: true,
        msg: "Account is verified",
      });

      await sendWelcomeNoteEmail(email); // send welcome note email
    } else {
      // if otp not matched
      res.status(404).send({
        success: false,
        msg: "Invalid OTP",
      });
    }
  } else {
    // if email is not found
    res.status(404).send({
      success: false,
      msg: "Email is not found",
    });
  }
};

/**
 * Resend OTP to email
 */
const resendOTP = async (req, res) => {
  const { email } = req.body;

  const existingUser = await authModel.findOne({ email });

  // if email is found
  if (existingUser) {
    await otpModel.deleteOne({ email });
    let otp = generateOTP(); // generate otp

    await otpModel.create({ email, otp });

    sendOtpEmail(email, otp, (resend = true)); // send an otp email
    return res.status(201).send({
      success: true,
      msg: "OTP Resend Successful",
    });
  } else {
    // email is not found
    res.status(404).send({
      success: false,
      msg: "Email is not found",
    });
  }
};

/**
 * Forget Password
 */
const forgetPassword = async (req, res) => {
  const { email } = req.params;
  const { newPassword } = req.body;
  try {
    let targetUser = await authModel.findOne({ email });

    if (targetUser) {
      bcrypt.hash(
        newPassword,
        parseInt(process.env.SALT),
        async function (err, hash) {
          // Store hash in your password DB.
          if (err) {
            return res.status(500).send({
              success: false,
              msg: "Something Went Wrong Please Try Again",
              error: err,
            });
          } else {
            targetUser.password = hash;
            await targetUser.save();

            await otpModel.deleteOne({ email }); // delete otp

            res.status(200).send({
              success: true,
              msg: "Password Reset Successful",
            });
          }
        }
      );
    } else {
      return res.status(404).send({
        success: false,
        msg: "Email is not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Verify Admin by email and token
 */
const verifyAdmin = async (req, res) => {
  res.status(200).send({
    success: true,
    msg: "Admin Verified",
  });
};

/**
 * Verify User by email and token
 */
const verifyUser = async (req, res) => {
  res.status(200).send({
    success: true,
    msg: "Admin Verified",
  });
};

/**
 * Update User Info
 */
const updateUser = async (req, res) => {
  const { id } = req.params;

  const updateFields = {};

  const allFields = ["name", "phone", "role", "isVarify", "address", "photo"];

  allFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field];
    }
  });

  if (req.file !== undefined) {
    // let imageLink = `${process.env.HOST_URL}${process.env.PORT}/${req.file.filename}`;

    updateFields.photo = req.file.filename;
  }

  try {
    let targetUser = await authModel.findOneAndUpdate(
      { _id: id },
      {
        $set: updateFields,
      }
    );

    // If images were updated, delete the old image
    if (updateFields.photo && targetUser.photo) {
      // let imagePath = targetUser.photo.split("/");
      // let oldImage = imagePath[imagePath.length - 1];

      try {
        await deleteFile(
          `${path.join(__dirname, "../temp")}/${targetUser.photo}`
        );
      } catch (fileDeleteErr) {
        res.status(500).send({
          success: false,
          msg: "Internal Server Error",
          fileDeleteErr,
        });
      }
    }

    res.status(200).send({
      success: true,
      msg: "Profile is update",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Get Single User
 */
const singleUser = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await authModel.findOne({ _id: id }).select("-password");

    let updateUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      photo: user.photo,
      verified: user.isVarify,
    };

    res.status(200).send({
      success: true,
      msg: "User Fetched success",
      user: updateUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * All Users
 */

const allusers = async (req, res) => {
  let User = await authModel.find();
  res.status(200).send({
    success: true,
    msg: "All Users",
    users: User,
  });
};

/**
 * Delete User
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    let targetUser = await authModel.findOneAndDelete({ _id: id });

    if (targetUser.photo) {
      // let imagePath = targetUser.photo.split("/");
      // let oldImage = imagePath[imagePath.length - 1];

      try {
        await deleteFile(
          `${path.join(__dirname, "../temp")}/${targetUser.photo}`
        );
      } catch (fileDeleteErr) {
        res.status(500).send({
          success: false,
          msg: "Internal Server Error",
          fileDeleteErr,
        });
      }
    }

    res.status(200).send({
      success: true,
      msg: "User Deleted",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  singleUser,
  updateUser,
  loginUser,
  accessToken,
  registerUser,
  changePassword,
  sendEmailVerificationToken,
  verifyEmailToken,
  forgetPassword,
  logoutUser,
  verifyOTP,
  resendOTP,
  verifyAdmin,
  verifyUser,
  allusers,
  deleteUser,
};
