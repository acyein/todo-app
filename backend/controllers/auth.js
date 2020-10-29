const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Signup user
exports.signupUser = async (req, res) => {
  // Validate user input before creating user
  // const { error } = registerValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // Check if user is already in DB
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exists');

  // Hash password
  const salt = await bcrypt.genSalt(10); // 10 rounds
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    bio: req.body.bio,
    interest: req.body.interest,
  });
  try {
    const savedUser = await user.save();
    // res.send(savedUser);
    res.json({
      message: 'Succcess! You are now registered',
      info: savedUser,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Login user
exports.loginUser = async (req, res) => {
  // Validate user input before logging in user
  // const { error } = loginValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // Check if user is already in DB
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email not found');

  // Check if password is correct
  // Compare pw from input and hashed pw from db
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Incorrect password');

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('authToken', token).status(200).json({
    message: 'Success! You are now logged in',
    authToken: token,
  });
};
