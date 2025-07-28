const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

// GET /api/protected
router.get('/', protect, (req, res) => {
  res.json({
    message: 'You have access to this protected route!',
    user: req.user, // the decoded user info
  });
});

module.exports = router;
