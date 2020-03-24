const mongoose = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    address: {
      Street: String,
      City: String,
      State: String,
      ZIP: String
    },
    images: [{ type: String }],
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    description: String,
    available: {
      type: Boolean,
      default: true
    },
    isTraveler: { type: Boolean, default: false },
    isHost: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Listing", listingSchema);
