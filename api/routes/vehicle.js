const router = require("express").Router();
const { createVehicle, getVehicles } = require("../controllers/vehicle");

router.get("/", getVehicles);
router.post("/", createVehicle);

module.exports = router;
