const express = require('express');
const router = express.Router();
const { createVisit } = require('../controllers/visit.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/', authenticate, createVisit);

module.exports = router;
