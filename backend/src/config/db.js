const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // If connection is already established or connecting, reuse it
    if (mongoose.connection.readyState >= 1) {
      console.log('MongoDB connection already established, reusing.');
      return;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
