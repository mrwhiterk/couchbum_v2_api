var express = require("express");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

const { usersRouter, listingsRouter } = require("./routes");

require("dotenv").config();


var app = express();

mongoose
.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to server"), err => console.log(err);
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use(passport.initialize());
app.use("/api/users", usersRouter);
app.use("/api/listings", listingsRouter);

module.exports = app;
