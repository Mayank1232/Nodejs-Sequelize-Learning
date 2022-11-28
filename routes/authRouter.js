const authController = require("../controllers/authController");

const router = require("express").Router();

// post register

router.post("/register", authController.register);

// get list of users

router.get("/users", authController.usersList);

// login user

router.post("/login", authController.login);

// sent email

router.post("/sendEmail", authController.sendEmail);

module.exports = router;
