const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is requiredd"],
    unique: true,
    trim: true, //If someone write's "         Rishit          " it would trim the space and write "Rishit"
    //      Note:
    // Leading and trailing spaces ➝ removed ✅

    // Spaces between words ➝ kept ❌ (not removed)
  },
  email: {
    type: String,
    required: [true, "Email is requiredd"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is requiredd"],
  },
  contact: {
    type: Number,
    required: [true, "Please enter your contact details"],
    min: [6000000000, "Not a valid contact"],
    maxLength: [9999999999, "Not a valid contact"],
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
},{timestamps: true});

module.exports = mongoose.model('User', userSchema) //'User'==> collection name

//Use of {timestamps: true}:


// When a document is created or updated, Mongoose will automatically manage:

// Field----->               Description

// createdAt---->      Time when the document was first created
// updatedAt---->      Time when the document was last modified