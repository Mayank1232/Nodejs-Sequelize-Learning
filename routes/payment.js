const router = require("express").Router();
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "You got 2400$", data: req.user });
  }
);

module.exports = router;
