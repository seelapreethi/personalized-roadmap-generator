const express = require('express');
const router = express.Router();

const { generateRoadmap, saveRoadmap } = require('../controllers/roadmapController');
const protect = require('../middleware/authMiddleware');

// POST /api/roadmap - generate roadmap
router.post('/', protect, generateRoadmap);

// POST /api/roadmap/save - save roadmap
router.post('/save', protect, saveRoadmap);

module.exports = router;
