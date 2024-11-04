const express = require('express');
const router = express.Router();
const videoAnalyticsController = require('../controllers/videoAnalyticsController');

// Define routes
router.get('/', videoAnalyticsController.getAllAnalytics);        
router.post('/', videoAnalyticsController.addAnalytics);         
router.get('/:booking_id', videoAnalyticsController.getAnalyticsByBookingId); 

// Additional routes (uncomment if needed)
// router.delete('/:id', videoAnalyticsController.deleteAnalyticsById);
router.post('/upsert', videoAnalyticsController.upsertAnalyticsByIdentifiers);


module.exports = router;
