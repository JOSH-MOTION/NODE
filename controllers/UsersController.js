const UserModel = require('../model/usersModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const sigupController = async (req, res) => {
  try {
    // Validate input fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user data
    const { name, email, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create new user
    const user = new UserModel({
      name,
      email,
       password: hashedPassword,
    });

    // Save user to database
    const result = await user.save();

    // Respond with success
    return res.json({ message: 'User signed up successfully', data: {name: user.name , email: user.email} });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error signing up user' });
  }
};

const siginController = async (req, res) => {
  // Implementation for sign-in controller
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() }); 
}

try {
  
const { email, password } = req.body;
// find user with email
const user = await UserModel.findOne({ email: email });
if (!user) {
  return res.status(400).json({ message: 'Invalid email or password' });
}
// compare password with hashed password
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return res.status(400).json({ message: 'Invalid email or password' }); 
}
// respond with success
return res.json({ message: 'User signed in successfully', data: {name: user.name , email: user.email} });

} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Error signing in user' });
}

};
module.exports = { sigupController, siginController };
