const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser } = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Apply the middleware to all routes in this file
// They will all be protected and restricted to admins
router.use(protect);
router.use(restrictTo('admin'));

router.route('/')
  .get(getAllUsers);

router.route('/:id')
  .put(updateUser);

module.exports = router;