const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  marks: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  grade: { // e.g., "A", "B", etc.
    type: String,
  },
  comments: {
    type: String,
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
});

const Grade = mongoose.model('Grade', gradeSchema);
module.exports = Grade;