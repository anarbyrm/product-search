const mongoose = require('mongoose');

const connectDB = async (uri) => {
    await mongoose.connect(uri);
    console.log("database is up.");
}

module.exports = connectDB;
