const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    isHost: {
      type: Boolean,
      default: false
    },
    isTraveler: {
      type: Boolean,
      default: false
    },
    skills: [
      {
        type: String
      }
    ],
    listings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
      }
    ],
    avatar: String,
    bio: { type: String }
  },
  {
    timestamps: true
  }
);

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
