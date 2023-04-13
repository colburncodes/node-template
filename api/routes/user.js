const router = require("express").Router();

const { getUsers, getUser, updateUser } = require("../controllers/user");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.put("/:userId", updateUser);

module.exports = router;
