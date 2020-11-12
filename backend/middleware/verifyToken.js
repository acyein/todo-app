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
    const error = new Error('Cannot verify token');
    error.statusCode = 401;
    throw error;
  }
  // Lets server know user is logged in with this id
  req.userId = decodedToken.userId;
  console.log(`userId is ${req.userId}`);
  next();
};


// jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
  //   if (err) {
  //     return res.status(401).json({
  //       error: true,
  //       message: 'Invalid user',
  //     });
  //   } else {
  //     // console.log(result);
  //     const user = User.findById(result._id);
  //     if (user) {
  //       req.user = user;
  //       next();
  //     }
  //   }
  // });