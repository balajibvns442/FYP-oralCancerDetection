const pool = require('../db');

exports.getPendingReviews = async (_, res) => {
  const [rows] = await pool.query(`
    SELECT r.id AS review_id, p.risk, p.confidence, i.image_path
    FROM reviews r
    JOIN predictions p ON r.prediction_id = p.id
    JOIN images i ON p.image_id = i.id
    WHERE r.status = 'PENDING'
  `);
  res.json(rows);
};

exports.submitReview = async (req, res) => {
  const { review_id, notes } = req.body;
  const doctorId = req.user.userId;

  const [result] = await pool.query(`
    UPDATE reviews
    SET doctor_id=?, notes=?, status='REVIEWED', reviewed_at=NOW()
    WHERE id=? AND status='PENDING'
  `, [doctorId, notes, review_id]);

  if (result.affectedRows === 0)
    return res.status(409).json({ error: 'Already reviewed' });

  res.json({ message: 'Review submitted' });
};
