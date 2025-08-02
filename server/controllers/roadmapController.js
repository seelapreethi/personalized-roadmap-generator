// controllers/roadmapController.js
const generateRoadmap = async (req, res) => {
  const { goal, skillLevel, weeklyTime, topics } = req.body;

  if (!goal || !skillLevel || !weeklyTime || !topics) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    // ✨ Replace this with AI logic or static mapping later
    const roadmap = [
      { week: 1, topic: "Basics of " + topics.split(',')[0] },
      { week: 2, topic: "Intro to " + topics.split(',')[1] || '...' },
      { week: 3, topic: "Mini Project using " + topics },
      { week: 4, topic: "Revision + Practice" },
    ];

    res.status(200).json({ roadmap });
  } catch (error) {
    console.error('Roadmap generation error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { generateRoadmap };
