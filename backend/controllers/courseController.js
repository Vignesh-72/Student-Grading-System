const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Teacher
const createCourse = async (req, res) => {
  const { name, description, semester } = req.body;

  try {
    const course = new Course({
      name,
      description,
      semester,
      teacherId: req.user._id, // The logged-in user is the teacher
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Enroll a student in a course
// @route   PUT /api/courses/:id/enroll
// @access  Private/Teacher
const enrollStudent = async (req, res) => {
  const { studentId } = req.body;

  try {
    const course = await Course.findById(req.params.id);
    const student = await User.findById(studentId);

    if (!course || !student) {
      return res.status(404).json({ message: 'Course or Student not found' });
    }

    // Check if the student is already enrolled to prevent duplicates [cite: 59]
    if (course.enrolledStudents.includes(studentId)) {
      return res.status(400).json({ message: 'Student already enrolled' });
    }

    course.enrolledStudents.push(studentId);
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all courses (can be filtered by teacher)
// @route   GET /api/courses
// @access  Private
const getCourses = async (req, res) => {
  try {
    // If a teacherId query is present, filter by it
    const filter = req.query.teacherId ? { teacherId: req.query.teacherId } : {};
    const courses = await Course.find(filter);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = { createCourse, enrollStudent, getCourses };