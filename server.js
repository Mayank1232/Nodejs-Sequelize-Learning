const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
require("./auth/passport");
const nodemailer = require("nodemailer");

const app = express();

var corOptions = {
  origin: "https://localhost:8081",
};

//middleware

app.use(cors(corOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use(passport.initialize());

// bodyparser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routers
const Router = require("./routes/");

app.use(Router);

// testing api

app.get("/", (req, res) => {
  res.json({ message: "Mayank Parmar" });
});

// reusable transporter object using the default SMTP transport

// creating port

const PORT = process.env.PORT || 8080;

// server

app.listen(PORT, () => {
  console.log(`Application running successfully on ${PORT}`);
});
