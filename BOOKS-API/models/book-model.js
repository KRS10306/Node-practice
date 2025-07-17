const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        require : [true, "Book title is required"],
        maxLength : [100, "Book title can not be more than 100 characters"]
    },
    author: {
        type: String,
        require : [true, "Author name is required"]
    },
    year: {
        type: Number,
        require : [true, "Publication year is required"],
        min : [1900, "Book can not be before 20th century"],
        maxLength : [new Date().getFullYear(), "Book cannot be of the future"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Books", BookSchema)