const LearningForm = require('../models/LearningForm');

const submitLearningForm = async (req, res) => {
  const { topics, skillLevel, weeklyTime, goal } = req.body;

  if (!topics || !skillLevel || !weeklyTime || !goal) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newForm = new LearningForm({
      user: req.user.id,
      topics,
      skillLevel,
      weeklyTime,
      goal,
    });

    await newForm.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (err) {
    console.error('Error saving form:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { submitLearningForm };
