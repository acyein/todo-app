const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Checks if token exists and verifies it if it does exists
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // If header doesn't exist
  if (!authHeader) {
    res.status(401).json('No Authorization found');
  }
  // Splits 'Bearer' and token by ' '
  let token = authHeader && authHeader.split(' ')[1];
  let decodedToken;
  try {
    // Verifies token and returns decoded token
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    // If token is manipulated / expired
    res.status(500).json(err);
  }
  if (!decodedToken) {
    res.status(401).json({ error: 'Cannot verify token'});
  }
  // Lets server know user is logged in with this id
  req.userId = decodedToken.userId;
  console.log(`userId is ${req.userId}`);
  next();
};