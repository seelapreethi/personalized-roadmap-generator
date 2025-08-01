const express = require('express');
const router = express.Router();
const { submitLearningForm } = require('../controllers/learningFormController');
const authMiddleware = require('../middleware/authMiddleware.js');

router.post('/', authMiddleware, submitLearningForm);

module.exports = router;
