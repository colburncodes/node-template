const router = require("express").Router();
const userController = require("./user");

router.use("/users", userController);

router.use((req, res) => {
  res.status(500).send({ message: "Router Not Found" });
});

module.exports = router;
