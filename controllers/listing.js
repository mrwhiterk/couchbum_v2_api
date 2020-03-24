const { User, Listing } = require("../models");
const passport = require("passport");
const authenticate = require("../authenticate");

exports.index = async (req, res) => {
  try {
    let listings = await Listing.find().populate('host', 'username').exec();
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

exports.delete = async (req, res) => {
  try {
    let listing = await Listing.findByIdAndDelete(req.params.id);
    res.send({ success: true, listing });
  } catch (err) {
    res.send({ err });
  }
};
