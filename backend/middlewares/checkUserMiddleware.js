const jwt = require("jsonwebtoken");
const authModel = require("../model/auth.model");

const checkUserMiddleware = (req, res, next) => {
  const { accessToken, sessionToken } = req.cookies;
  // if token found
  if (accessToken) {
    // token verify
    jwt.verify(
      accessToken,
      process.env.JWT_SECRET,
      async function (err, decoded) {
        // if error
        if (err) {
          res.status(400).send({
            success: false,
            msg: "Invalid Token",
          });
        } else {
          // if decoded and user email is exist
          const existUser = await authModel.findOne({ email: decoded.email });
          if (existUser) {
            next();
          }
          // if not matched
          else {
            res.status(401).send({
              success: false,
              msg: "User Unauthorized",
            });
          }
        }
      }
    );
  }
  // if token not found
  else {
    if (!sessionToken) {
      return res.status(400).send({
        success: false,
        msg: "User Token Not Found, Please Login Again",
      });
    }

    jwt.verify(sessionToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res
          .status(403)
          .json({ success: false, msg: "Invalid Session Token" });

      const user = await authModel.findOne({ email: decoded.email });
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
      // const newSessionToken = jwt.sign(
      //   { email: existUser.email },
      //   process.env.SESSION_SECRET,
      //   { expiresIn: "7d" } // Expires in 7 days
      // );

      // user.sessionToken = newSessionToken;
      // await user.save();

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.SYSTEM_ENV === "production",
        sameSite: "None",
        maxAge: 900000,
      });

      next();
    });
  }
};

module.exports = checkUserMiddleware;
