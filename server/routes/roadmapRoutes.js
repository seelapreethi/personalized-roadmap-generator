const express = require('express');
const router = express.Router();

const { generateRoadmap, saveRoadmap } = require('../controllers/roadmapController');
const protect = require('../middleware/authMiddleware'); // ✅ Correct way

router.post('/', protect, generateRoadmap);
router.post('/save', protect, saveRoadmap);

module.exports = router;
