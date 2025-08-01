// routes/formRoutes.js
const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const protect = require('../middleware/authMiddleware');

// POST - Submit Form
router.post('/submit', protect, async (req, res) => {
  const { skillLevel, learningGoal, preferredTech, duration } = req.body;

  try {
    const form = new Form({
      user: req.user._id,
      skillLevel,
      learningGoal,
      preferredTech,
      duration,
    });

    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (err) {
    console.error('Form submission error:', err);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// GET - Get all forms by user
router.get('/myforms', protect, async (req, res) => {
  try {
    const forms = await Form.find({ user: req.user._id });
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching forms' });
  }
});

module.exports = router;
