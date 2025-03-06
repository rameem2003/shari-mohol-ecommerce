const jwt = require("jsonwebtoken");
const authModel = require("../model/auth.model");

const checkUserMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  // if token found
  if (token) {
    // token verify
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
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
    });
  }
  // if token not found
  else {
    res.status(400).send({
      success: false,
      msg: "User Token Not Found, Please Login Again",
    });
  }
};

module.exports = checkUserMiddleware;
