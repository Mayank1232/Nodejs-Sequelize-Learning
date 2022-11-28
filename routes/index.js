const express = require("express");
const router = express.Router();

const productRouter = require("./productRouter");
const reviewRouter = require("./reviewRouter");
const authRouter = require("./authRouter");
const payment = require("./payment");

router.use("/product", productRouter);
router.use("/review", reviewRouter);
router.use("/auth", authRouter);
router.use("/payment", payment);

module.exports = router;
