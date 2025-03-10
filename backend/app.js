// import all packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.config");
const router = require("./routes");
const app = express();

connectDB(); // mongodb connect

// apply middlewares
app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);
app.use(express.static("temp"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

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
