// middleware/auth.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the authorization header
  // const token = req.header('Authorization')?.replace('Bearer ', '');

  // if (!token) {
  //   return res.status(401).json({ message: 'Authorization token is required' });
  // }

  // // Verify the token
  // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //   if (err) {
  //     return res.status(401).json({ message: 'Invalid or expired token' });
  //   }

  //   // Store the decoded user information in the request object
  //   req.user = decoded;
  //   next();
  // });
   // Temporary bypass for authentication
    console.log("Authentication bypassed for testing.");
    next();
};

module.exports = authMiddleware;


// Also need to understand this code too becuz i have just pasted it :(