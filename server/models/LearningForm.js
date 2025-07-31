const mongoose = require('mongoose');

const LearningFormSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  topics: {
    type: [String],
    required: true,
  },
  skillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  weeklyTime: {
    type: Number,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('LearningForm', LearningFormSchema);
