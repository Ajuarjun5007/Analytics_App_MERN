const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Import database connection setup
require('./db'); // Ensure that './db' establishes the connection to MongoDB

const videoAnalyticsRoutes = require('./routes/videoAnalyticsRoutes');

// Middleware
app.use(express.json({ limit: '1mb' })); // Set JSON payload size limit to 1MB
app.use(cors()); // Enable CORS

// Use routes
app.use('/api/video-analytics', videoAnalyticsRoutes); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
