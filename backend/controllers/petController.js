const Pet = require("../models/petModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//for creating/adding new pet --admin only
exports.createPet = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "pets",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  req.body.addedBy = req.user.id;
  const pet = await Pet.create(req.body);

  res.status(201).json({ success: true, pet });
});

//updating the pet details --admin only
exports.updatePet = catchAsyncError(async (req, res, next) => {
  let pet = Pet.findById(req.params.id);

  if (!pet) {
    return next(new ErrorHandler("Pet Info Not Found", 404));
  }

  pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, pet });
});

//for removing pet info / delete data
exports.deletePet = catchAsyncError(async (req, res, next) => {
  const pet = await Pet.findById(req.params.id);

  if (!pet) {
    return next(new ErrorHandler("Pet Info Not Found", 404));
  }

  await pet.remove();

  res.status(200).json({
    success: true,
    message: "Pet Info Deleted/Removed.",
  });
});

//get pet details (one)
exports.getPetDetails = catchAsyncError(async (req, res, next) => {
  let pet = await Pet.findById(req.params.id);
  //Error handler here

  if (!pet) {
    return next(new ErrorHandler("Pet Info Not Found", 404));
  }

  res.status(200).json({ success: true, pet });
});

//for showing or getting all pets
exports.getAllPets = catchAsyncError(async (req, res) => {
  const resultPerPage = 8;
  const petsCount = await Pet.countDocuments();

  const apiFeature = new ApiFeatures(Pet.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const pets = await apiFeature.query;

  res.status(200).json({
    success: true,
    pets,
    petsCount,
    resultPerPage,
  });
});

exports.getMyPets = catchAsyncError(async (req, res, next) => {
  const myPets = await Pet.find({ addedBy: req.user._id });
  res.status(200).json({ success: true, myPets });
});
