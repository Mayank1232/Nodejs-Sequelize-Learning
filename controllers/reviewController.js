const db = require("../models");

const Review = db.reviews;

// Add Review

const addReview = async (req, res) => {
  let info = {
    rating: req.body.rating,
    description: req.body.description,
    product_id: req.body.product_id,
  };

  const review = await Review.create(info);
  res.status(200).send(review);
};

// get all reviews

const getAllReviews = async (req, res) => {
  console.log("In");
  let reviews = await Review.findAll({});
  res.status(200).send(reviews);
};

// delete review

const deleteReview = async (req, res) => {
  let id = req.params.id;
  const review = await Review.destroy({ where: { id: id } });
  res.status(200).send("Deleted Successfully");
};

module.exports = {
  addReview,
  getAllReviews,
  deleteReview,
};
