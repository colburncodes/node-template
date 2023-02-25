const mongoose = require("mongoose");
const User = require("../../models/user");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((error) => {
      next(error);
    });
};

const getUser = async (req, res, next) => {
  const { userId } = req.params;

  const doesUserExist = await User.exists(userId);

  if (!doesUserExist) {
    res.status(404).send({
      message: "User Not Found",
    });
  }
  User.findById(userId)
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  getUsers,
  getUser,
};
