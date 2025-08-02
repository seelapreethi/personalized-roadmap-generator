const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  goal: String,
  skillLevel: String,
  weeklyTime: String,
  topics: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LearningForm', formSchema);
