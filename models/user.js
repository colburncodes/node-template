const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const isEmail = require("validator/lib/isEmail");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: "Wrong email format",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  rate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password") // this — the User model
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
