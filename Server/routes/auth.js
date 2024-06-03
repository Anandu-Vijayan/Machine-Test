const express = require("express");
const { login, signup, Adminlogin} = require("../controllers/auth");

const router = express.Router();

router.post("/login", login);
router.post ("/signup",signup)

router.post("/Adminlogin", Adminlogin);

module.exports = router;
  