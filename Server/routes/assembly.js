const express = require('express');
const router = express.Router();
const { start, end } = require('../controllers/assembly');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/start', authMiddleware, start);
router.post('/end', authMiddleware, end);

module.exports = router;
