const express = require('express');
const router = express.Router();
const { submitLearningForm } = require('../controllers/learningFormController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, submitLearningForm);

module.exports = router;
