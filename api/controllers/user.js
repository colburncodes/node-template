const bcrypt = require("bcryptjs");
const User = require("../../models/user");

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(401).send({ message: err.message });
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
        res.status(404).send({ message: "Not Found!" });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Invalid user id" });
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, hash }))
    .then((user) => {
      res.status(200).send({ data: user });
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
    .then((user) => res.status(200).send({ data: user }))
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
