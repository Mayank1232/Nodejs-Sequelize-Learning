const express = require("express");
const cors = require("cors");

const app = express();

var corOptions = {
  origin: "https://localhost:8081",
};

//middleware

app.use(cors(corOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// routers
const Router = require("./routes/");

app.use(Router);

// testing api

app.get("/", (req, res) => {
  res.json({ message: "Mayank Parmar" });
});

// creating port

const PORT = process.env.PORT || 8080;

// server

app.listen(PORT, () => {
  console.log(`Application running successfully on ${PORT}`);
});
