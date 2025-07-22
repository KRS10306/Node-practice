const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Every field is compulsory"],
      unique: [true, "Username already exists"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Every field is compulsory"],
      unique: [true, "email already exists"],
      trime: true,
    },
    contact: {
      type: Number,
      required: [true, "Every field is compulsory"],
      unique: [true, "contact already exists"],
      min: [6000000000, "Wrong Phone number"],
      maxLength: [9999999999, "Wrong Phone number"],
    },
    password: {
      type: String,
      required: [true, "Every field is compulsory"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
