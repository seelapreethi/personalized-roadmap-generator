const express = require('express');
const router = express.Router();

const {
  generateRoadmap,
  saveRoadmap,
  getUserRoadmaps,
  deleteRoadmap,
} = require('../controllers/roadmapController');

const protect = require('../middleware/authMiddleware');

// Generate roadmap
router.post('/', protect, generateRoadmap);

// Save roadmap
router.post('/save', protect, saveRoadmap);

// Get user's saved roadmaps
router.get('/my', protect, getUserRoadmaps);

// Delete roadmap
router.delete('/:id', protect, deleteRoadmap);

module.exports = router;
