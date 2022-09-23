const productController = require("../controllers/productController");

const router = require("express").Router();

// routers for products

router.post("/addProduct", productController.addProduct);

router.get("/allProduct", productController.getAllProducts);

router.get("/published", productController.getPublishedProduct);

router.get("/:id", productController.getProductReviews);

router.get("/:id", productController.getOneProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

// router for review

module.exports = router;
