const mongoose = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    address: {
      street: String,
      city: String,
      state: String,
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
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Listing", listingSchema);
