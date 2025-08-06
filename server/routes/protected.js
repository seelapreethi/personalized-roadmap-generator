const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware'); // ✅ Make sure path is correct

// @route   GET /api/protected
// @desc    A protected test route
// @access  Private
router.get('/', protect, (req, res) => {
  res.json({ message: `Welcome, ${req.user.name}` });
});
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: `Welcome, ${req.user.name}`, user: req.user });
});


module.exports = router;
