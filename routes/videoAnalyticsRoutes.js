const express = require('express');
const router = express.Router();
const videoAnalyticsController = require('../controllers/videoAnalyticsController');

// Get all video analytics
router.get('/', videoAnalyticsController.getAllAnalytics);

// Add new video analytics
router.post('/', videoAnalyticsController.addAnalytics);

// Get video analytics by ID
router.get('/:id', videoAnalyticsController.getAnalyticsById);

// Delete video analytics by ID
router.delete('/:id', videoAnalyticsController.deleteAnalyticsById);

module.exports = router;
