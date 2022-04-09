const Pet = require("../models/petModel");
const User = require("../models/userModel");
const Adopt = require("../models/adoptModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.newRequest = catchAsyncError(async (req, res, next) => {
  const { ques1, ques2, ques3, phoneNo, pinCode, city, locationState } =
    req.body;
  const request = await Adopt.create({
    ques1,
    ques2,
    ques3,
    phoneNo,
    pinCode,
    city,
    locationState,
    pet: req.params.id,
    user: req.user._id,
  });

  res.status(201).json({ success: true, request });
});

// exports.getAllUserRequests = catchAsyncError(async (req,res,next)=>{
//   const requests = await Adopt.find();
// })

//this will get the requests for the owner of pet
exports.getAdoptRequestsById = catchAsyncError(async (req, res, next) => {
  const requests = await Adopt.find({ pet: req.params.id }).populate({
    path: "pet",
    select: "name breed age location",
  });
  if (!requests) {
    return next(new ErrorHandler("No Requests", 400));
  }
  res.status(200).json({ success: true, requests });
});

exports.getSingleRequest = catchAsyncError(async (req, res, next) => {
  const request = await Adopt.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!request) {
    return next(new ErrorHandler("Invalid Adoption Request", 400));
  }
  res.status(200).json({ success: true, request });
});

//for adopt/me , requests made by user
exports.getUserRequests = catchAsyncError(async (req, res, next) => {
  //console.log("In Backend User requests");

  const requests = await Adopt.find({ user: req.user._id }).populate(
    "pet",
    "name breed location images"
  );
  res.status(200).json({ success: true, requests });
});

exports.updateRequestStatus = catchAsyncError(async (req, res, next) => {
  const request = await Adopt.findById(req.params.id);
  if (request.requestStatus === "Accepted") {
    return next(new ErrorHandler("Request already accepted", 400));
  }

  // if current userid === pet.addedBy only then it can be changed

  request.requestStatus = req.body.status;
  request.save();
  res.status(200).json({ success: true });
});
