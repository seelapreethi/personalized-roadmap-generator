// controllers/roadmapController.js

exports.generateRoadmap = async (req, res) => {
  try {
    const { goal, skillLevel, weeklyTime, topics } = req.body;

    // Validate input
    if (!goal || !skillLevel || !weeklyTime || !topics) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const topicList = topics.split(',').map((t) => t.trim());
    const roadmap = [];
    let week = 1;

    for (const topic of topicList) {
      roadmap.push({
        week: week++,
        topic: `Basics of ${topic}`,
        estimatedHours: parseInt(weeklyTime),
      });

      roadmap.push({
        week: week++,
        topic: `Practice exercises for ${topic}`,
        estimatedHours: parseInt(weeklyTime),
      });
    }

    // Add final weeks
    roadmap.push({
      week: week++,
      topic: 'Capstone Project based on all topics',
      estimatedHours: parseInt(weeklyTime),
    });

    roadmap.push({
      week: week++,
      topic: 'Revision + Interview Prep',
      estimatedHours: parseInt(weeklyTime),
    });

    res.json({ roadmap });

  } catch (error) {
    console.error('Error generating roadmap:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
