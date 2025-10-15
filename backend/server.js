require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const gradeRoutes = require('./routes/gradeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Add back the missing routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/grades', gradeRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Add this app.listen() block
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} and connected to MongoDB!`);
    });
  })
  .catch((error) => console.error('Failed to connect to MongoDB', error));

// You no longer need to export the app for local development
// module.exports = app;