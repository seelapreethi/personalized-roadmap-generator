// routes/formRoutes.js
const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const protect = require('../middleware/authMiddleware');

// @route   POST /api/learning-form
// @desc    Submit a personalized learning form
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { topics, skillLevel, weeklyTime, goal } = req.body;

    const newForm = new Form({
      user: req.user._id,
      skillLevel,
      learningGoal: goal,
      preferredTech: topics.join(', '),
      duration: weeklyTime
    });

    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (error) {
    console.error('Form submission failed:', error);
    res.status(400).json({ message: 'Form submission failed', error });
  }
});

module.exports = router;
