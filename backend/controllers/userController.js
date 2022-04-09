const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs/dist/bcrypt");
const sendToken = require("../utils/jwtToken");
const { response } = require("express");
const cloudinary = require("cloudinary");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    return next(new ErrorHandler("User registered already!!!", 401));
  }

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next("Email/Password is required!", 400);
  }
  const userExist = await User.findOne({ email }).select("+password");

  if (!userExist) {
    return next(new ErrorHandler("Invalid Login Info!!!", 401));
  }

  const checkPassword = await userExist.comparePassword(password);

  if (!checkPassword) {
    return next(new ErrorHandler("Invalid Login Info!!!", 401));
  }

  sendToken(userExist, 200, res);
});

exports.userLogout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

//get user details --client
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  return res.status(200).json({ success: true, user });
});

//update user details
exports.updateUserDetails = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    email: req.body.email,
    name: req.body.name,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(201).json({
    success: true,
    message: "User info updated successfully",
  });
});

//get all user details --admin
exports.getAllUserDetails = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, users });
});

//get single user details by id --admin
exports.getUserDetailsById = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found / Invalid User ID", 404));
  }
  res.status(200).json({ success: true, user });
});

//update user role --admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`User id: ${req.params.id} does not exist`));
  }

  const newUserData = {
    email: req.body.email,
    name: req.body.name,
    role: req.body.role,
  };

  const userExist = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(201).json({
    success: true,
    message: "User role updated Successfully",
  });
});

//delete user details --admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`User id: ${req.params.id} does not exist`));
  }
  await user.remove();

  res.status(201).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
