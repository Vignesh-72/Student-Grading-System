const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes (Authentication)
const protect = async (req, res, next) => {
  let token;

  // Check if the token is in the headers and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., "Bearer eyJhbGci...")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the ID from the token's payload
      // Attach the user object to the request, excluding the password
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to restrict routes to specific roles (Authorization)
const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Check if the user's role is included in the roles allowed for this route
    if (!roles.includes(req.user.role)) {
      // 403 Forbidden, as per your acceptance criteria [cite: 58]
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    next(); // User has the correct role, proceed
  };
};

module.exports = { protect, restrictTo };