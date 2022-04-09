const mongoose = require("mongoose");
const petSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter the Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Enter the description"],
  },
  breed: {
    type: String,
    required: [true, "Enter the breed"],
  },
  age: {
    type: String,
    required: [true, "Enter the age"],
  },
  location: {
    type: String,
    required: [true, "Enter the City"],
  },
  loc: {
    type: String,
    required: [true, "Choose State"],
  },
  category: {
    type: String,
    required: [true, "Enter the Animal Category"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  addedAt: {
    type: Date,
    default: Date.now,
  },
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  currentStatus: {
    type: String,
    required: true,
    default: "Available",
  },
});

module.exports = mongoose.model("Pet", petSchema);
