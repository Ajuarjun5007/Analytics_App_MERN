const PadelData = require('../models/Video_Analytics');

// Get all video analytics
exports.getAllAnalytics = async (req, res) => {
    try {
        const analytics = await PadelData.find();
        res.status(200).json({
            status: 'success',
            message: 'Fetched all video analytics successfully',
            data: analytics,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch video analytics',
            error: error.message,
        });
    }
};

// Add new video analytics
exports.addAnalytics = async (req, res) => {
    try {
        const newAnalytics = new PadelData(req.body);
        await newAnalytics.save();
        res.status(201).json({
            status: 'success',
            message: 'Video analytics added successfully',
            data: newAnalytics,
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Failed to add video analytics',
            error: error.message,
        });
    }
};

// Get analytics by booking_id
exports.getAnalyticsByBookingId = async (req, res) => {
    const { booking_id } = req.params;

    try {
        const analytics = await PadelData.findOne({ booking_id });
        
        if (!analytics) {
            return res.status(404).json({
                status: 'error',
                message: 'No analytics found for the specified booking_id',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Fetched analytics data successfully',
            data: analytics,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch analytics data by booking_id',
            error: error.message,
        });
    }
};


// Upsert analytics by `booking_id` and `camera_id`


exports.upsertAnalyticsByIdentifiers = async (req, res) => {
    const { booking_id, camera_id } = req.query;
    const data = req.body;

    try {
        // Validate that booking_id and camera_id in query match those in body
        if (data.booking_id !== booking_id || data.camera_id !== camera_id) {
            return res.status(400).json({
                status: 'error',
                message: 'Mismatch between booking_id and camera_id in query and body'
            });
        }

        // Check if the document exists by booking_id and camera_id
        const existingAnalytics = await PadelData.findOne({ booking_id, camera_id });

        if (existingAnalytics) {
            // Update if the document exists
            const updatedAnalytics = await PadelData.findOneAndUpdate(
                { booking_id, camera_id },
                { $set: data },
                { new: true }
            );

            return res.status(200).json({
                status: 'success',
                message: 'Updated existing analytics data',
                data: updatedAnalytics,
            });
        } else {
            // If no document exists, create a new one
            const newAnalytics = new PadelData({ booking_id, camera_id, ...data });
            await newAnalytics.save();

            return res.status(201).json({
                status: 'success',
                message: 'Created new analytics data',
                data: newAnalytics,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Failed to upsert video analytics data',
            error: error.message,
        });
    }
};


