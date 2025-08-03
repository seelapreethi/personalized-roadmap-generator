const generateRoadmap = async (req, res) => {
  const { goal, skillLevel, weeklyTime, topics } = req.body;

  if (!goal || !skillLevel || !weeklyTime || !topics) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    const topicList = topics.split(',').map(t => t.trim());
    const roadmap = [];

    let week = 1;

    // Step 1: Add 2 weeks per topic (Learning + Practice)
    topicList.forEach(topic => {
      roadmap.push({ week: week++, topic: `Basics of ${topic}` });
      roadmap.push({ week: week++, topic: `Practice exercises for ${topic}` });
    });

    // Step 2: Add capstone project
    roadmap.push({ week: week++, topic: `Capstone Project based on all topics` });

    // Step 3: Add revision
    roadmap.push({ week: week++, topic: `Revision + Interview Prep` });

    res.status(200).json({ roadmap });
  } catch (error) {
    console.error('Roadmap generation error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { generateRoadmap };
