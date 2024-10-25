// server.js
const express = require('express');
const mongoose = require('./db');
const cors = require('cors');
const app = express();

const videoAnalyticsRoutes = require('./routes/videoAnalyticsRoutes');

app.use(express.json());
app.use(cors());

app.use('/api/video-analytics', videoAnalyticsRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
