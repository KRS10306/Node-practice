require('dotenv').config()
const mongoose = require('mongoose');

const connectToDb = async() =>{
    const mongoUrl = process.env.MONGOURL
    try {
        await mongoose.connect(mongoUrl)
        console.log("MongoDB connected successfully")
    } catch (err) {
        console.error("MongoDB connection failed due to --> " + err);
        process.exit(1)
    }
}

module.exports = connectToDb