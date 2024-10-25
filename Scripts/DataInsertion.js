const mongoose = require('mongoose');
const PadelData = require('../models/Video_Analytics'); 

const mongoURI = 'mongodb://localhost:27017/padel-analytics'; 

async function insertData() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected successfully!");

        const jsonData = require('../analyitcsData.json'); 

        // Create a new document
        const newData = new PadelData({
            deadzone: jsonData.deadzone,
            distance: jsonData.distance,
            heatmap: jsonData.heatmap,
            shots: Object.keys(jsonData.shots).map(key => ({
                id: key,
                shoot_count: parseInt(jsonData.shots[key].shoot_count) || 0,
            })),
            zonemap_values: Object.keys(jsonData.zonemap_values).map(key => ({
                id: key,
                yellow_zone: parseInt(jsonData.zonemap_values[key].yellow_zone) || 0,
                red_zone: parseInt(jsonData.zonemap_values[key].red_zone) || 0,
                green_zone: parseInt(jsonData.zonemap_values[key].green_zone) || 0,
            })),
        });

        await newData.save();
        console.log("Data inserted successfully!");

    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        mongoose.connection.close();
    }
}

insertData();
