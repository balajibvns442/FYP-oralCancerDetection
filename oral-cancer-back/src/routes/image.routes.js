const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const { uploadImage } = require('../controllers/image.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post(
  '/upload',
  authenticate,
  upload.single('image'),
  uploadImage
);

module.exports = router;
