var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();

// import routes

var teacherRouter = require("./routes/teacher");
var studentRouter = require("./routes/student");
var homeworkRouter = require("./routes/homework");

const { default: mongoose } = require("mongoose");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected Successfully to Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/teacher", teacherRouter);
app.use("/api/student", studentRouter);
app.use("/api/homework", homeworkRouter);

module.exports = app;
