const jwt = require('jsonwebtoken');

// Verify token
module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    // If user does not pass token in headers, they're blocked from accessing the page
    if(!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).send('Invalid token');
    }
};