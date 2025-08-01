// models/Form.js
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skillLevel: String,
  learningGoal: String,
  preferredTech: String,
  duration: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Form', formSchema);
