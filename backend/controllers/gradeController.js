const Grade = require('../models/Grade');

// Helper function to calculate letter grade from marks 
const calculateGrade = (marks) => {
  if (marks >= 90) return 'A';
  if (marks >= 80) return 'B';
  if (marks >= 70) return 'C';
  if (marks >= 60) return 'D';
  return 'F';
};

// @desc    Add a new grade for a student
// @route   POST /api/grades
// @access  Private/Teacher
const addGrade = async (req, res) => {
  const { courseId, studentId, marks, comments } = req.body;

  try {
    // Validate marks are between 0 and 100 [cite: 63]
    if (marks < 0 || marks > 100) {
      return res.status(400).json({ message: 'Marks must be between 0 and 100' });
    }

    const newGrade = new Grade({
      courseId,
      studentId,
      marks,
      comments,
      grade: calculateGrade(marks), // Auto-calculate grade 
    });

    const savedGrade = await newGrade.save();
    res.status(201).json(savedGrade);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all grades for a specific student
// @route   GET /api/grades/student/:studentId
// @access  Private
const getStudentGrades = async (req, res) => {
  try {
    // Security check: a student can only see their own grades. Admin/teacher can see any.
    if (req.user.role === 'student' && req.user._id.toString() !== req.params.studentId) {
      return res.status(403).json({ message: 'You are not authorized to view these grades' });
    }

    const grades = await Grade.find({ studentId: req.params.studentId }).populate('courseId', 'name');
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all grades for a specific course
// @route   GET /api/grades/course/:courseId
// @access  Private/Teacher
const getCourseGrades = async (req, res) => {
  try {
    const grades = await Grade.find({ courseId: req.params.courseId }).populate('studentId', 'name email');
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { addGrade, getStudentGrades, getCourseGrades };