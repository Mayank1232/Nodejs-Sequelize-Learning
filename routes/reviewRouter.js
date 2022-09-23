const reviewController = require("../controllers/reviewController");

const router = require("express").Router();

router.post("/addReview", reviewController.addReview);

router.get("/allReviews", reviewController.getAllReviews);

router.delete("/:id", reviewController.deleteReview);

module.exports = router;
