const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '1h' // As per your acceptance criteria [cite: 234]
  });
};

module.exports = generateToken;