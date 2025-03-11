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
          let sessionToken = jwt.sign(existUser, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          let accessToken = jwt.sign(existUser, process.env.JWT_SECRET, {
            expiresIn: "15m",
          });

          res.cookie("sessionToken", sessionToken, {
            // httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
          return res.status(200).send({
            success: true,
            msg: "Admin Login Successfully",
            user: existUser,
            accessToken,
          });
        }
        // if user
        else if (existUser.role === "user") {
          let sessionToken = jwt.sign(existUser, process.env.JWT_SECRET, {
            expiresIn: "3d",
          });
          let accessToken = jwt.sign(existUser, process.env.JWT_SECRET, {
            expiresIn: "15m",
          });

          res.cookie("sessionToken", sessionToken, {
            // httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 3 * 24 * 60 * 60 * 1000,
          });
          return res.status(200).send({
            success: true,
            msg: "User Login Successfully",
            user: existUser,
            accessToken,
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

  const allFields = ["name", "email", "password", "phone", "address", "photo"];

  allFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field];
    }
  });

  if (req.file !== undefined) {
    let imageLink = `${process.env.HOST_URL}${process.env.PORT}/${req.file.filename}`;

    updateFields.photo = imageLink;
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
      let imagePath = targetUser.photo.split("/");
      let oldImage = imagePath[imagePath.length - 1];

      try {
        await deleteFile(`${path.join(__dirname, "../temp")}/${oldImage}`);
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

module.exports = {
  singleUser,
  updateUser,
  loginUser,
  registerUser,
  verifyOTP,
  resendOTP,
  verifyAdmin,
  verifyUser,
  allusers,
};
