require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./models");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = user => {
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: 3600 * 10 });
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    // console.log("Jwt payload: ", jwt_payload);
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.verifyAdmin = (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    let err = new Error("You are not authorized to perform this operation!");
    err.statusCode = 403;
    next(err);
  }
};