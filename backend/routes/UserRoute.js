const { Router } = require("express");
const { getAllUsers, addUser, getSingleUser, loginUser } = require("../controllers/UserController");
const router = Router();

router.get("/", getAllUsers);
router.post("/add", addUser);
router.get("/:id", getSingleUser);
router.post("/login", loginUser);

module.exports = router;
