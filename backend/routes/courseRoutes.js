const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/authMiddleware');
const {
  createCourse,
  enrollStudent,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');

// Routes for the base path '/'
router.route('/')
  .get(protect, getCourses)
  .post(protect, restrictTo('teacher', 'admin'), createCourse);

// Routes for a specific course ID
router.route('/:id')
  .get(protect, getCourseById)
  .put(protect, restrictTo('admin'), updateCourse)
  .delete(protect, restrictTo('admin'), deleteCourse);

// Route for enrolling a student
router.route('/:id/enroll')
  .put(protect, restrictTo('teacher' , 'admin'), enrollStudent);

module.exports = router;