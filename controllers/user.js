const { User } = require("../models");
const passport = require('passport');
const authenticate = require("../authenticate");

exports.index = async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
    
  } catch (error) {
    console.log(error)
  }
};

exports.getTravelers = async (req, res) => {
  try {
    let travelers = await User.find();
    res.send(travelers);

  } catch (err) {
    console.log(err)
  }
}

exports.register = async (req, res) => {
    User.register(
      new User({
        username: req.body.username,
        email: req.body.email
      }),
      req.body.password,
      async (err, user) => {
        if (err) {
          res.status(400).send({ err });
        } else {
          try {
            await user.save();
            passport.authenticate("local")(req, res, () => {
              const token = authenticate.getToken({
                _id: req.user._id,
                username: req.user.username
              });
              res.send({
                user,
                token
              });
            });
          } catch (error) {
            console.log(error);
          }
        }
      }
    );
};
  
exports.login = (req, res) => {
  const token = authenticate.getToken({
    _id: req.user._id,
    username: req.user.username
  });
  res.send({ success: true, user: req.user, token });
};

exports.show = (req, res) => {
  res.send(req.user);
};

exports.deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.send();
  } catch (err) {
    res.send({ err });
  }
};