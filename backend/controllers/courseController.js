const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Teacher, Private/Admin
const createCourse = async (req, res) => {
  const { name, description, semester, teacherId } = req.body;

  try {
    let finalTeacherId = req.user._id; // Default to the logged-in user (for when a teacher creates a course)

    // If the user is an admin AND a teacherId was sent from the form, use that teacherId instead.
    if (req.user.role === 'admin' && teacherId) {
      finalTeacherId = teacherId;
    }

    const course = new Course({
      name,
      description,
      semester,
      teacherId: finalTeacherId, // Use the correctly determined teacher ID
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Enroll a student in a course
const enrollStudent = async (req, res) => {
  const { studentId } = req.body;
  try {
    const course = await Course.findById(req.params.id);
    const student = await User.findById(studentId);
    if (!course || !student) {
      return res.status(404).json({ message: 'Course or Student not found' });
    }
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

// @desc    Get all courses (can be filtered)
const getCourses = async (req, res) => {
  try {
    const filter = {};
    if (req.query.teacherId) filter.teacherId = req.query.teacherId;
    if (req.query.semester) filter.semester = req.query.semester;
    const courses = await Course.find(filter).populate('teacherId', 'name');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('enrolledStudents', 'name email');
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      course.name = req.body.name || course.name;
      course.description = req.body.description || course.description;
      course.semester = req.body.semester || course.semester;
      course.teacherId = req.body.teacherId || course.teacherId;
      const updatedCourse = await course.save();
      res.json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      await course.deleteOne();
      res.json({ message: 'Course removed' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createCourse,
  enrollStudent,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};