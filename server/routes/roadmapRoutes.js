const express = require('express');
const { generateRoadmap } = require('../controllers/roadmapController');

const router = express.Router();

// Protected route
const protect = require('../middleware/authMiddleware'); 

router.post('/', protect, generateRoadmap);

module.exports = router;
