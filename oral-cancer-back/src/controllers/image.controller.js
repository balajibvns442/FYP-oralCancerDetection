const pool = require('../db');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

exports.uploadImage = async (req, res) => {
  const { visit_id } = req.body;

  if (!visit_id) {
    return res.status(400).json({ error: 'visit_id required' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'image file required' });
  }

  const imagePath = req.file.path;

  try {
    // 1️⃣ Save image record
    const [imageResult] = await pool.query(
      'INSERT INTO images (visit_id, image_path) VALUES (?, ?)',
      [visit_id, imagePath]
    );

    const imageId = imageResult.insertId;

    // 2️⃣ Prepare ML request
    const formData = new FormData();
    formData.append('file', fs.createReadStream(imagePath));

    // 3️⃣ Call Flask ML server
    const mlResponse = await axios.post(
      'http://localhost:5000/predict',
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 15000
      }
    );

    const { risk, confidence } = mlResponse.data;

    const [predResult] = await pool.query(
  'INSERT INTO predictions (image_id, risk, confidence) VALUES (?, ?, ?)',
  [imageId, risk, confidence]
);

const predictionId = predResult.insertId;

// 🔹 CREATE REVIEW ENTRY
await pool.query(
  'INSERT INTO reviews (prediction_id, status) VALUES (?, "PENDING")',
  [predictionId]
);


    // 5️⃣ Respond
    res.json({
      image_id: imageId,
      risk,
      confidence
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image processing failed' });
  }
};


