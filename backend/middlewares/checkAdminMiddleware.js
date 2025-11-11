const { verifyJWTToken, refreshTokens } = require("../services/auth.service");
const {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} = require("../constant/constant");

const checkAdminMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  console.log("token", accessToken, "token 1", refreshToken);

  req.user = null;

  if (!accessToken && !refreshToken) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }

  if (accessToken) {
    const decodedToken = await verifyJWTToken(accessToken);
    if (decodedToken.role == "admin") {
      req.user = decodedToken;
      return next();
    } else {
      return res
        .status(403)
        .send({ success: false, message: "Forbidden: Admins only" });
    }
  }

  if (refreshToken) {
    try {
      const { newAccessToken, newRefreshToken, user } = await refreshTokens(
        refreshToken
      );

      req.user = user;

      const baseConfig = { httpOnly: true, secure: true };

      res.cookie("access_token", newAccessToken, {
        ...baseConfig,
        maxAge: ACCESS_TOKEN_EXPIRY,
      });

      res.cookie("refresh_token", newRefreshToken, {
        ...baseConfig,
        maxAge: REFRESH_TOKEN_EXPIRY,
      });

      return next();
    } catch (error) {
      console.log(error.message);
    }
  }
};

module.exports = checkAdminMiddleware;
