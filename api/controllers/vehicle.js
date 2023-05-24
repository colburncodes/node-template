const Vehicle = require("../../models/vehicle");
const Status = require("../../utils/error");

const getVehicles = (req, res, next) => {
  Vehicle.find({})
    .then((items) => res.send(items))
    .catch(next);
};

const createVehicle = (req, res, next) => {
  const { name, plate, type, capacity } = req.body;

  Vehicle.create({ name, plate, type, capacity, owner: req.user._id })
    .then((vehicle) => {
      if (!vehicle) {
        return res.status(Status.BadRequest).send({ message: "Invalid data" });
      }
      return res.send({ vehicle });
    })
    .catch((error) => next(error));
};

module.exports = {
  getVehicles,
  createVehicle,
};
