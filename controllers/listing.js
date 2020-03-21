const { User, Listing } = require("../models");
const passport = require("passport");
const authenticate = require("../authenticate");

exports.index = async (req, res) => {
  try {
    let listings = await Listing.find();
    res.send(listings);
  } catch (error) {
    console.log(error);
  }
};

exports.getUserListings = async (req, res) => {
  try {
    let listings = await Listing.find({ host: req.user._id });
    res.send(listings);
  } catch (error) {
    console.log(error);
  }
};

exports.create = async (req, res) => {
  try {
    let listing = await Listing.create({
      ...req.body,
      host: req.user._id
    });

    req.user.listings.push(listing);

    await req.user.save();
    res.send(listing);
  } catch (error) {
    res.status(400).send({ error });
  }
};

// exports.register = async (req, res) => {
//     User.register(
//       new User({
//         username: req.body.username,
//         email: req.body.email
//       }),
//       req.body.password,
//       async (err, user) => {
//         if (err) {
//           res.status(400).send({ err });
//         } else {
//           try {
//             await user.save();
//             passport.authenticate("local")(req, res, () => {
//               const token = authenticate.getToken({
//                 _id: req.user._id,
//                 username: req.user.username
//               });
//               res.send({
//                 user,
//                 token
//               });
//             });
//           } catch (error) {
//             console.log(error);
//           }
//         }
//       }
//     );
// };

// exports.login = (req, res) => {
//   const token = authenticate.getToken({
//     _id: req.user._id,
//     username: req.user.username
//   });
//   res.send({ success: true, user: req.user, token });
// };

// exports.show = (req, res) => {
//   res.send(req.user);
// };

exports.delete = async (req, res) => {
  try {
    let listing = await Listing.findByIdAndDelete(req.params.id);
    res.send({ success: true, listing });
  } catch (err) {
    res.send({ err });
  }
};
