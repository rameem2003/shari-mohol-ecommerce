const jwt = require("jsonwebtoken");
const authModel = require("../model/auth.model");

const checkAdminMiddleware = (req, res, next) => {
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
        // if decoded and user role is matched to admin
        const existAdmin = await authModel.findOne({ email: decoded.email });
        if (existAdmin) {
          if (decoded.role == "admin") {
            next();
          } else {
            res.status(401).send({
              success: false,
              msg: "Admin Unauthorized",
            });
          }
        }
        // if not matched
        else {
          res.status(401).send({
            success: false,
            msg: "Admin Unauthorized",
          });
        }
      }
    });
  }
  // if token not found
  else {
    res.status(400).send({
      success: false,
      msg: "Admin Token Not Found, Please Login Again As An Admin",
    });
  }
};

module.exports = checkAdminMiddleware;
