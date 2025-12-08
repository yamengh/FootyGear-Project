const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/footygear');
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.log('⚠️  MongoDB not connected - website works but signup/login disabled');
    }
};

module.exports = connectDB;
