const { Schema, model } = require("mongoose");
const validator = require("validator");


const userSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    },
  },
  avatar: {
    type: String,
    required: true,
  },
  events: [
    {
      type: String,
      lowercase: true,
      trim: true,
    },
  ],
  timestamp: {
    type: String,
    default: new Date().getTime(),
  },
});


const User = model("User", userSchema);
module.exports = User;