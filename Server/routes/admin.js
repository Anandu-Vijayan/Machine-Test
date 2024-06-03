const express = require("express");
const { metrics} = require("../controllers/admin");
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.get("/metrics",authMiddleware, metrics);



module.exports = router;
 