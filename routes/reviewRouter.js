const reviewController = require("../controllers/reviewController");
const passport = require("passport");
const router = require("express").Router();

router.post("/addReview", reviewController.addReview);

router.get(
  "/allReviews",
  passport.authenticate("jwt", { session: false }),
  reviewController.getAllReviews
);

// delete

router.delete("/:id", reviewController.deleteReview);

module.exports = router;
