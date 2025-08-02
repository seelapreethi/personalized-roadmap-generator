const express = require('express');
const router = express.Router();
const LearningForm = require('../models/LearningForm');
const protect = require('../middleware/authMiddleware');

// @route   POST /api/learning-form
// @desc    Submit a personalized learning form
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { goal, skillLevel, weeklyTime, topics } = req.body;

    const newForm = new LearningForm({
      user: req.user._id,
      learningGoal: goal,
      currentSkillLevel: skillLevel,
      availableTimePerWeek: weeklyTime,
      topicsOfInterest: topics,
    });

    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (error) {
    console.error('Form submission failed:', error);
    res.status(400).json({ message: 'Form submission failed', error });
  }
});

module.exports = router;
