const express = require('express');
const router = express.Router();
const { createOrGetPatient } = require('../controllers/patient.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/', authenticate, createOrGetPatient);

module.exports = router;
