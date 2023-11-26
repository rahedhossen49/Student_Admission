//body lib import
const express = require("express");
const app = express();
const path = require("path");

// security Middleware lib import
const ratelimit = require("express-rate-limit");
const helmet = require("helmet");
const mongooseSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();
// database import

const mongoose = require("mongoose");
const studentRouter = require("./src/controller/studentController");

// security middleware implement
app.use(cors());
app.use(helmet());
app.use(mongooseSanitize());
app.use(xss());
app.use(hpp());
app.use(express.json());
app.use(morgan("dev"));
// request rateLimit
// const limiter = ratelimit({windowMs: 15 * 60 * 1000, max:3000})
// app.use(limiter)
app.use(express.urlencoded({ extended: true }));

// database connection
mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("Database connection successfully"))
  .catch((error) => console.log(error));

app.use("/", studentRouter);

//frontend router define
app.use(express.static("client/dist"));
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

module.exports = app;
