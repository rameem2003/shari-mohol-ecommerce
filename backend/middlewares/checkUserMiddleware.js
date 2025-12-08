const jwt = require("jsonwebtoken");
const authModel = require("../model/auth.model");
const sessionModel = require("../model/session.model");
const { verifyJWTToken, refreshTokens } = require("../services/auth.service");
const {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  base_config,
} = require("../constant/constant");

const checkUserMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  req.user = null;

  if (!accessToken && !refreshToken) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }

  if (accessToken) {
    const decodedToken = verifyJWTToken(accessToken);
    req.user = decodedToken;
    return next();
  }

  if (refreshToken) {
    try {
      const { newAccessToken, newRefreshToken, user } = await refreshTokens(
        refreshToken
      );

      req.user = user;

      // const baseConfig = { httpOnly: true, secure: true };

      res.cookie("access_token", newAccessToken, {
        ...base_config,
        maxAge: ACCESS_TOKEN_EXPIRY,
      });

      res.cookie("refresh_token", newRefreshToken, {
        ...base_config,
        maxAge: REFRESH_TOKEN_EXPIRY,
      });

      return next();
    } catch (error) {
      console.log(error.message);
    }
  }
};

module.exports = checkUserMiddleware;
