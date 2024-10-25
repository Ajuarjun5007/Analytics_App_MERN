
const mongoose = require('mongoose');
const padeldatas= require('../models/Video_Analytics'); 
const videoData = require('../analyitcsData.json'); 

const mongoURI = 'mongodb://localhost:27017/padel_analytics';

async function insertData() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected successfully!');
        const result = await padeldatas.insertMany(videoData);
        console.log('Data inserted:', result);

    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        mongoose.connection.close();
    }
}

insertData();
