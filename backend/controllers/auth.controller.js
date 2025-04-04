const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const checkEmailValid = require("../helpers/checkEmailValid");
const sendOtpEmail = require("../helpers/sendOtpEmail");
const generateOTP = require("../helpers/generateOTP");
const deleteFile = require("../helpers/deleteFile");
const authModel = require("../model/auth.model");
const otpModel = require("../model/otp.model");

/**
 * user register
 */
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // if no name, email, password
  if (!name || !email || !password) {
    return res.status(400).send({
      success: false,
      msg: "Please Enter All Fields",
    });
  }

  // password length is less than 6
  if (password.length < 6) {
    return res.status(400).send({
      success: false,
      msg: "Password Must Be Atleast 6 Characters",
    });
  }

  // if not an email
  if (!checkEmailValid(email)) {
    return res.status(400).send({
      success: false,
      msg: "Please Enter Valid Email",
    });
  }

  // if email is exist
  let existingUser = await authModel.findOne({ email });
  if (existingUser) {
    return res.status(400).send({
      success: false,
      msg: "Email Already Exist",
    });
  }

  // new user create and send response
  try {
    await otpModel.deleteOne({ email });
    let otp = generateOTP(); // generate an otp

    // hashing the password
    bcrypt.hash(
      password,
      parseInt(process.env.SALT),
      async function (err, hash) {
        if (err) {
          console.log(err);
          return res.status(500).send({
            msg: "Something Went Wrong Please Try Again",
            error: err,
          });
        }
        let user = new authModel({
          name,
          email,
          password: hash, // Store hash in your password DB.
          role,
          otp,
        });
        await user.save();

        await otpModel.create({ email, otp });

        sendOtpEmail(email, otp); // send an otp email
        return res.status(201).send({
          success: true,
          msg: "New User Account Created",
          user,
        });
      }
    );
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong Please Try Again",
      error,
    });
  }
};

/**
 * user login
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // if no email or password
  if (!email || !password) {
    return res.status(400).send({
      success: false,
      msg: "Please Enter All Fields",
    });
  }

  // if not an email
  if (!checkEmailValid(email)) {
    return res.status(400).send({
      success: false,
      msg: "Please Enter Valid Email",
    });
  }

  // send response, token, cookies
  try {
    let user = await authModel.findOne({ email });

    // if no user
    if (!user) {
      return res.status(400).send({
        success: false,
        msg: "User Not Found",
      });
    }

    // password compare
    bcrypt.compare(password, user.password, async function (err, result) {
      // if password not matched
      if (err) {
        console.log(err);
        return res.status(500).send({
          success: false,
          msg: "Something Went Wrong Please Try Again",
          error: err,
        });
      }
      // if password matched
      if (result) {
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

        // if admin
        if (existUser.role === "admin") {
          let sessionToken = jwt.sign(
            { email: existUser.email },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          let accessToken = jwt.sign(existUser, process.env.JWT_SECRET, {
            expiresIn: "15m",
          });

          user.sessionToken = sessionToken;
          await user.save();

          res.cookie("sessionToken", sessionToken, {
            // httpOnly: true,
            secure: false,
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
          });
          res.cookie("accessToken", accessToken, {
            // httpOnly: true,
            secure: false,
            maxAge: 900000, // 15 min
          });
          return res.status(200).send({
            success: true,
            msg: "Admin Login Successfully",
            user: existUser,
            accessToken,
            sessionToken,
          });
        }
        // if user
        else if (existUser.role === "user") {
          let sessionToken = jwt.sign(
            { email: existUser.email },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d",
            }
          );
          let accessToken = jwt.sign(existUser, process.env.JWT_SECRET, {
            expiresIn: "15m",
          });

          user.sessionToken = sessionToken;
          await user.save();

          res.cookie("sessionToken", sessionToken, {
            // httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

          res.cookie("accessToken", accessToken, {
            // httpOnly: true,
            secure: false,
            maxAge: 900000, // 15 min
          });
          return res.status(200).send({
            success: true,
            msg: "User Login Successfully",
            user: existUser,
            accessToken,
            sessionToken,
          });
        }
      } // if password not matched
      else {
        return res.status(400).send({
          success: false,
          msg: "Invalid Credentials",
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong Please Try Again",
      error,
    });
  }
};

/**
 * user logout
 */
const logoutUser = async (req, res) => {
  const { id } = req.params;

  try {
    res.clearCookie("accessToken");
    res.clearCookie("sessionToken");
    await authModel.findOneAndUpdate({ _id: id }, { sessionToken: null });
    return res.status(200).send({
      success: true,
      msg: "User Logout success",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong Please Try Again",
      error,
    });
  }
};

/**
 * Change Password
 */
const changePassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword, conFirmPassword } = req.body;

  try {
    let user = await authModel.findOne({ _id: id });

    // if no user
    if (!user) {
      return res.status(400).send({
        success: false,
        msg: "User Not Found",
      });
    }

    if (newPassword == conFirmPassword) {
      // password compare
      bcrypt.compare(oldPassword, user.password, async function (err, result) {
        // if password not matched
        if (err) {
          console.log(err);
          return res.status(500).send({
            success: false,
            msg: "Something Went Wrong Please Try Again",
            error: err,
          });
        }
        // if password matched
        if (result) {
          bcrypt.hash(
            newPassword,
            parseInt(process.env.SALT),
            async function (err, hash) {
              if (err) {
                return res.status(500).send({
                  success: false,
                  msg: "Something Went Wrong Please Try Again",
                  error: err,
                });
              }
              user.password = hash;
              await user.save();

              return res
                .status(200)
                .send({ success: true, msg: "Password is changed" });
            }
          );
        } // if password not matched
        else {
          return res.status(400).send({
            success: false,
            msg: "Wrong Password",
          });
        }
      });
    } else {
      res.status(400).send({
        success: false,
        msg: "New Password and confirm password not matched",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong Please Try Again",
      error,
    });
  }
};

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

    existingUser.otp = otp;
    await existingUser.save();

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
    let user = await authModel.findOne({ _id: id });

    res.status(200).send({
      success: true,
      msg: "User Fetched success",
      user,
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
  forgetPassword,
  logoutUser,
  verifyOTP,
  resendOTP,
  verifyAdmin,
  verifyUser,
  allusers,
  deleteUser,
};
