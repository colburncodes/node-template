const router = require("express").Router();
const userController = require("./user");
const vehicleController = require("./vehicle");
const { login, createUser } = require("../controllers/user");
const Status = require("../../utils/error");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/users", userController);
router.use("/vehicles", vehicleController);



router.use((req, res) => {
  res.status(Status.ServerError).send({ message: "Router Not Found" });
});

module.exports = router;
