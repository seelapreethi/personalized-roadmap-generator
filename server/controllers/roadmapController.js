const Roadmap = require('../models/roadmapModel');

// @desc    Generate a personalized roadmap
// @route   POST /api/roadmap
// @access  Private
const generateRoadmap = async (req, res) => {
  try {
    const { goal, skillLevel, weeklyTime, topics } = req.body;

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
    res.status(500).json({ error: 'Server error while generating roadmap.' });
  }
};

// @desc    Save roadmap to database
// @route   POST /api/roadmap/save
// @access  Private
const saveRoadmap = async (req, res) => {
  try {
    const { roadmap } = req.body;

    if (!roadmap || roadmap.length === 0) {
      return res.status(400).json({ error: 'Roadmap data is missing.' });
    }

    const newRoadmap = new Roadmap({
      user: req.user._id,
      roadmap,
    });

    await newRoadmap.save();

    res.status(201).json({ message: '✅ Roadmap saved successfully!' });
  } catch (error) {
    console.error('Error saving roadmap:', error);
    res.status(500).json({ error: 'Server error while saving roadmap.' });
  }
};

// @desc    Get saved roadmaps for user
// @route   GET /api/roadmap/my
// @access  Private
const getUserRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ user: req.user._id });
    res.json(roadmaps);
  } catch (error) {
    console.error('Error fetching user roadmaps:', error);
    res.status(500).json({ error: 'Failed to load saved roadmaps.' });
  }
};

// @desc    Delete a roadmap
// @route   DELETE /api/roadmap/:id
// @access  Private
const deleteRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found or unauthorized' });
    }

    res.json({ message: 'Roadmap deleted successfully' });
  } catch (error) {
    console.error('Error deleting roadmap:', error);
    res.status(500).json({ error: 'Failed to delete roadmap' });
  }
};

module.exports = {
  generateRoadmap,
  saveRoadmap,
  getUserRoadmaps,
  deleteRoadmap,
};
