const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../utils/config");
const User = require("../../models/user");
const Status = require("../../utils/error");

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "1d",
        });
        res.send({ email, token });
      }
    })
    .catch((err) => {
      res.status(Status.Forbidden).send({ message: err.message });
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => {
      next(error);
    });
};

const getUser = async (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(Status.NotFound).send({ message: "Not Found!" });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(Status.NotFound).send({ message: "Invalid user id" });
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash }))
    .then((user) => {
      res.status(Status.Created).send({ data: user });
    })
    .catch((error) => {
      next(error);
    });
};

const updateUser = (req, res, next) => {
  const { userId } = req.params;
  const { name, avatar, about } = req.body;

  User.findByIdAndUpdate(userId, { $set: { name, avatar, about } })
    .orFail()
    .then((user) => res.status(Status.Ok).send({ data: user }))
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  login,
  getUsers,
  getUser,
  createUser,
  updateUser,
};
