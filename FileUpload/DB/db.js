//Connection
const mongoose = require("mongoose");

const createConnection = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log("DataBase connected")
        })
    } catch (err) {
        console.error("DataBase cannot be connected because ----> ");
    }
}
module.exports = createConnection