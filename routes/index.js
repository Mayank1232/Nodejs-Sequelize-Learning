const productRouter = require("./productRouter");
const reviewRouter = require("./reviewRouter");

const router = require("express").Router();

router.use("/product", productRouter);
router.use("/review", reviewRouter);

module.exports = router;
