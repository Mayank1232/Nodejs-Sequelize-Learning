const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const strategyJwt = passportJwt.Strategy;
const db = require("../models");
const User = db.user;

// passport.use({
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
//   secretOrKey: process.env.JWT_SECRET,
// });x

// passport strategyJwt

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new strategyJwt(opts, (jwt_payload, done) => {
    console.log(User);
    User.findOne({ where: { id: jwt_payload.id } })
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => console.log(err));
  })
);
