// Import required packages
require('dotenv').config(); // Loads environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); 
const courseRoutes = require('./routes/courseRoutes'); 
const gradeRoutes = require('./routes/gradeRoutes');
// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// API Routes
app.use('/api/auth', authRoutes); // Use the auth routes for any /api/auth URL
app.use('/api/users', userRoutes); 
app.use('/api/courses', courseRoutes); 
app.use('/api/grades', gradeRoutes); 

// --- Database Connection ---
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} and connected to MongoDB!`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });