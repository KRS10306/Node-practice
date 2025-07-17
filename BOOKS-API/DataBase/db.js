const mongoose = require('mongoose');

const connectToDb = async() =>{
    try {
        await mongoose.connect("mongodb+srv://shrivastwarishit6:Ri%40100306@cluster0.ehzlb7j.mongodb.net/")
        console.log("MongoDB connected successfully")
    } catch (err) {
        console.error("MongoDB connection failed due to --> " + err);
        process.exit(1)
    }
}

module.exports = connectToDb