const generateRoadmap = async (req, res) => {
  const { goal, skillLevel, weeklyTime, topics } = req.body;

  if (!goal || !skillLevel || !weeklyTime || !topics) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    const topicList = topics.split(',').map(t => t.trim());
    let roadmap = [];
    let week = 1;

    topicList.forEach((topic) => {
      if (skillLevel === 'beginner') {
        roadmap.push({ week: week++, topic: `Basics of ${topic}` });
        roadmap.push({ week: week++, topic: `Practice exercises for ${topic}` });
      } else if (skillLevel === 'intermediate') {
        roadmap.push({ week: week++, topic: `Deep Dive into ${topic}` });
        roadmap.push({ week: week++, topic: `Build mini project with ${topic}` });
      } else if (skillLevel === 'advanced') {
        roadmap.push({ week: week++, topic: `Advanced ${topic} concepts` });
        roadmap.push({ week: week++, topic: `Performance + Best Practices in ${topic}` });
      }
    });

    roadmap.push({ week: week++, topic: "Capstone Project based on all topics" });
    roadmap.push({ week: week++, topic: "Revision + Interview Prep" });

    res.status(200).json({ roadmap });
  } catch (error) {
    console.error('Roadmap generation error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { generateRoadmap };
