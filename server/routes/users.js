const router = require("express").Router();
const { register, login } = require("../controllers/users")


//register
router.post("/add-User", register)


//login
router.post("/login", login)


module.exports = router