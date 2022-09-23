const db = require("../models");

// create main models

const Product = db.products;
const Review = db.reviews;

// create request apis

// 1. Create product

const addProduct = async (req, res) => {
  let info = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  const product = await Product.create(info);
  res.status(200).send(product);
};

// 2. get all products

const getAllProducts = async (req, res) => {
  console.log("In");
  let products = await Product.findAll({});
  res.status(200).send(products);
};

// 3. get single products

const getOneProduct = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({ where: { id: id } });
  res.status(200).send(product);
};

// 4. update products

const updateProduct = async (req, res) => {
  console.log(req.body);
  let id = req.params.id;
  const product = await Product.update(req.body, { where: { id: id } });
  res.status(200).send("Product updated successfully");
};

// 5. delete product

const deleteProduct = async (req, res) => {
  let id = req.params.id;
  const product = await Product.destroy({ where: { id: id } });
  res.status(200).send("Deleted Successfully");
};

// 6. published products

const getPublishedProduct = async (req, res) => {
  let products = await Product.findAll({
    where: { published: true },
  });
  res.status(200).send(products);
};

// 7. connect one to many relation product and review

const getProductReviews = async (req, res) => {
  let id = req.params.id;
  const data = await Product.findOne({
    include: [
      {
        model: Review,
        as: "review",
      },
    ],
    where: { id: id },
  });
  res.status(200).send(data);
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getPublishedProduct,
  getProductReviews,
};
