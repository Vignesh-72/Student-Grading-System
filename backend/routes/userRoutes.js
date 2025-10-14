const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser, createUser, deleteUser } = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.use(protect);
router.use(restrictTo('admin'));

router.route('/')
  .get(getAllUsers)
  .post(createUser);

// UPDATE THIS ROUTE
router.route('/:id')
  .put(updateUser)
  .delete(deleteUser); // Add the DELETE method here

module.exports = router;
