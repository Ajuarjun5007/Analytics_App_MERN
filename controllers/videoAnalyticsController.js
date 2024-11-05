const PadelData = require('../models/Video_Analytics');
const zlib = require('zlib');
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

    try {
        let data;

        // Check if the request body is compressed
        if (req.headers['content-encoding'] === 'gzip') {
            // Decompress the gzipped request body
            data = await new Promise((resolve, reject) => {
                zlib.gunzip(req.body, (err, decompressedBuffer) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(JSON.parse(decompressedBuffer.toString('utf-8')));
                });
            });
        } else {
            // Parse uncompressed JSON data directly
            data = req.body;
        }

        // Validate identifiers in the request
        if (data.booking_id !== booking_id || data.camera_id !== camera_id) {
            return res.status(400).json({
                status: 'error',
                message: 'Mismatch between booking_id and camera_id in query and body'
            });
        }

        const updatedAnalytics = await PadelData.findOneAndUpdate(
            { booking_id, camera_id },
            { $set: data },
            { new: true, upsert: true, runValidators: true }
        );
        const isNew = updatedAnalytics.isNew;  
        const status = isNew ? 201 : 200;
        const message = isNew ? 'Created new analytics data' : 'Updated existing analytics data';

        res.status(status).json({
            status: 'success',
            message,
            data: updatedAnalytics,
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Failed to upsert video analytics data',
            error: error.message,
        });
    }
};


