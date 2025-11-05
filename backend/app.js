// import all packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const requestIp = require("request-ip");
const connectDB = require("./config/db.config");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./api.yaml");
const router = require("./routes");
const app = express();

connectDB(); // mongodb connect
console.log(process.env.SYSTEM_ENV);

// apply middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://shari-mohol.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.static("temp"));
app.use(express.static("uploads/avatars"));
app.use(express.static("uploads/banners"));
app.use(express.static("uploads/categories"));
app.use(express.static("uploads/products"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestIp.mw());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // httpOnly: true,
      secure: process.env.SYSTEM_ENV === "production" || false,
      // secure: false,
      sameSite: process.env.SYSTEM_ENV === "production" ? "None" : "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Welcome Route
 */
app.get("/", (req, res) => {
  res.status(200).send({
    title: "Shari Mohol API",
    Owner: "Maksudur Rahman Rasel",
    developer: "ROL Studio Bangladesh",
    author: "Mahmood Hassan Rameem",
  });
});

/**
 * For Error Route
 */
app.use((req, res, next) => {
  res.status(404).send({
    success: false,
    msg: "Invalid Route",
  });
});

module.exports = app;
