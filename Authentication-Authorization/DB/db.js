
const mongoose = require('mongoose');

const connectToDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected")
    } catch (err) {
        console.error("MongoDB connection failed ----> " + err);
        process.exit(1)
    }
}

module.exports = connectToDb