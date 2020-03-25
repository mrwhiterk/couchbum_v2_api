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
      required: false
    },
    isTraveler: {
      type: Boolean,
      required: false
    },
    skills: [
      {
        type: String
      }
    ],
    listings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
      }
    ],
    avatar: String,
    isTraveler: { type: Boolean, default: false },
    isHost: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
