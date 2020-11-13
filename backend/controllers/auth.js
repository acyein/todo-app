const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signupValidation, loginValidation } = require('../models/validation');

// Signup user
exports.signupUser = async (req, res) => {
  // Validate user input before creating user
  const { error } = signupValidation(req.body);
  if (error) {
    res.status(422).json({
      message: error.details[0].message,
    });
  }

  // Check if user is already in DB
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    res.status(400).json({
      message: 'Email already exists',
    });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10); // 10 rounds
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await newUser.save();
    // console.log(savedUser);
    res.json({
      message: `Succcessful signup! Welcome, ${savedUser.firstName}`,
      user: savedUser,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Login user
exports.loginUser = async (req, res) => {
  // Validate user input before logging in user
  const { error } = loginValidation(req.body);
  if (error) {
    res.status(422).json({
      message: error.details[0].message,
    });
  }

  // Check if user is already in DB
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(401).json({
      message: 'Email not found',
    });
  }

  // Check if password is correct
  // Compare pw from input and hashed pw from db
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    res.status(401).json({
      message: 'Incorrect password',
    });
  }

  try {
    // Create and assign a token
    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.TOKEN_SECRET,
      { expiresIn: 60 * 60 * 24 }
    ); // Expires in 24 hours
    res.header('Authorization', token).status(200).json({
      message: 'Sucessful login! Welcome back',
      user,
      token,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
