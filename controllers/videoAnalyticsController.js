const PadelData = require('../models/Video_Analytics');

// Get all video analytics
exports.getAllAnalytics = async (req, res) => {
    try {
        const analytics = await PadelData.find();
        res.status(200).json({
            status: 'success',
            message: 'Fetched all video analytics successfully',
            data: analytics
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch video analytics',
            error: error.message
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
            data: newAnalytics
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Failed to add video analytics',
            error: error.message
        });
    }
};

// Get analytics by ID
exports.getAnalyticsById = async (req, res) => {
    try {
        const analytics = await PadelData.findById(req.params.id);
        if (!analytics) {
            return res.status(404).json({
                status: 'error',
                message: 'Video analytics not found',
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Fetched video analytics successfully',
            data: analytics
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Failed to fetch video analytics',
            error: error.message
        });
    }
};

// Delete analytics by ID
exports.deleteAnalyticsById = async (req, res) => {
    try {
        const analytics = await PadelData.findByIdAndDelete(req.params.id);
        if (!analytics) {
            return res.status(404).json({
                status: 'error',
                message: 'Video analytics not found',
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Video analytics deleted successfully',
            data: analytics
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Failed to delete video analytics',
            error: error.message
        });
    }
};
