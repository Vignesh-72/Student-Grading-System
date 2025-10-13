const express = require('express');
const router = express.Router();
const { createCourse, enrollStudent, getCourses } = require('../controllers/courseController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Anyone logged in can get a list of courses
router.route('/')
  .get(protect, getCourses);

// Only teachers can create a new course
router.route('/')
  .post(protect, restrictTo('teacher'), createCourse);

// Only teachers can enroll students in their course
router.route('/:id/enroll')
  .put(protect, restrictTo('teacher'), enrollStudent);

module.exports = router;