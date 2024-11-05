const mongoose = require('mongoose');
const PadelData = require('../models/Video_Analytics');

const mongoURI = 'mongodb://localhost:27017/padel-analytics';

async function insertData() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected successfully!");

        const jsonData = require('../analyitcsData.json');
        
        const dataArray = Array.from({ length: 10 }, (_, index) => ({
            booking_id: `booking_${index + 1}`,  
            camera_id: `camera_${index + 1}`,   
            deadzone: jsonData.deadzone,
            distance: jsonData.distance,
            heatmap: jsonData.heatmap,
            heatmap2: jsonData.heatmap2,
            shots: Object.keys(jsonData.shots).map(key => ({
                id: `${key}_${index}`,  
                shoot_count: parseInt(jsonData.shots[key].shoot_count) || 0,
            })),
            zonemap_values: Object.keys(jsonData.zonemap_values).map(key => ({
                id: `${key}_${index}`, 
                yellow_zone: parseInt(jsonData.zonemap_values[key].yellow_zone) || 0,
                red_zone: parseInt(jsonData.zonemap_values[key].red_zone) || 0,
                green_zone: parseInt(jsonData.zonemap_values[key].green_zone) || 0,
            })),
        }));

        
        await PadelData.insertMany(dataArray);
        console.log("Data objects with unique booking_id and camera_id fields inserted successfully!");

    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        mongoose.connection.close();
    }
}

// Run the insertion function
insertData();
