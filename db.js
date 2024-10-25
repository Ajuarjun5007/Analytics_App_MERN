// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');


require('dotenv').config();  


const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/padel-analytics';

// Connect to MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,        
  useUnifiedTopology: true     
})
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Export mongoose to use in other files
module.exports = mongoose;
