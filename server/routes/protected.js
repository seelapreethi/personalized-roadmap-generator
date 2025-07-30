const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

// @route   GET /api/protected/
// @desc    Returns a basic protected message
// @access  Private
router.get('/', protect, (req, res) => {
  res.json({
    message: 'You have access to this protected route!',
    user: req.user, // decoded user info from JWT
  });
});

// @route   GET /api/protected/dashboard
// @desc    Returns dashboard message with user info
// @access  Private
router.get('/dashboard', protect, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.name || 'User'}!`,
    user: req.user,
  });
});

module.exports = router;
