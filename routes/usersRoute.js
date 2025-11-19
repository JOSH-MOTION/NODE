const express = require('express');
const { body } = require('express-validator');
const { sigupController,siginController } = require('../controllers/UsersController');
const UserModel = require('../model/usersModel'); // needed for email check

const router = express.Router();

// Use POST instead of PUT for signup (PUT is for updating existing users)
router.post(
  "/signup",
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required'),

    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .custom(async (value) => {
        // ✅ Check if the email already exists
        const existingUser = await UserModel.findOne({ email: value });
        if (existingUser) {
          throw new Error('Email already in use');
        }
        return true;
      }),

    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  sigupController
);

router.post (
  "/signin",
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email'), 
    body('password')
      .notEmpty()
      .withMessage('Password is required'), 
  ],
  siginController
);

module.exports = router;
