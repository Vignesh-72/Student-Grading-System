const express = require('express');
const router = express.Router();
const { addGrade, getStudentGrades, getCourseGrades } = require('../controllers/gradeController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Route for teachers to add a grade
router.route('/')
  .post(protect, restrictTo('teacher'), addGrade);

// Route for students to get their own grades (also accessible by admin/teacher)
router.route('/student/:studentId')
  .get(protect, getStudentGrades);

// Route for teachers to get all grades for a course
router.route('/course/:courseId')
  .get(protect, restrictTo('teacher', 'admin'), getCourseGrades);

module.exports = router;