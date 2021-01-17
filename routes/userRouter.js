const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;

// var path = require('path');
// console.log('. = %s', path.resolve('.'));
// console.log('__dirname = %s', path.resolve(__dirname));
