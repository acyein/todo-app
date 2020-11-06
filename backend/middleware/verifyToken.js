const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Checks if token exists and verifies it if it does exists
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    let token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
      if (err) {
        return res.status(401).json({
          error: true,
          message: 'Invalid user',
        });
      } else {
        // console.log(result);
        const user = User.findById(result._id);
        if (user) {
          req.user = user;
          next();
        }
      }
    });
  }
};
