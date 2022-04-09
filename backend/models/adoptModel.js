const mongoose = require("mongoose");

const adoptionSchema = new mongoose.Schema({
  ques1: {
    type: String,
    required: true,
  },
  ques2: {
    type: String,
    required: true,
  },
  ques3: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  locationState: {
    type: String,
    required: true,
  },
  pet: {
    type: mongoose.Schema.ObjectId,
    ref: "Pet",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  requestStatus: {
    type: String,
    required: true,
    default: "Pending Request",
  },
});

module.exports = mongoose.model("Adopt", adoptionSchema);
