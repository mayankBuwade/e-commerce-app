const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const validator = require("validator");
const cookieToken = require("../utils/cookieToken");
const cloudinary = require("cloudinary");
const CustomError = require("../utils/customError");
const mailHelper = require("../utils/emailHelper");
const crypto = require("crypto");

exports.signup = BigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;
  const options = {
    min: 8, // Minimum length
    max: undefined, // Maximum length (optional)
    numbers: true, // Require at least one number
    symbols: true, // Require at least one symbol
    uppercase: true, // Require at least one uppercase letter
    lowercase: true, // Require at least one lowercase letter
    spaces: false, // Disallow spaces (optional)
  };
  if (!name || !email || !password) {
    throw new CustomError("Name, email, and password are required", 400);
  }

  if (!req.files || !req.files.photo) {
    throw new CustomError("Photo is required for signup", 400);
  }

  const file = req.files.photo;
  if (!file.mimetype.startsWith("image")) {
    throw new CustomError("Uploaded file is not an image", 400);
  }

  if (!validator.isEmail(email)) {
    throw new CustomError("Please enter a valid email address", 400);
  }

  if (!validator.isStrongPassword(password, options)) {
    throw new CustomError("Not a strong password", 400);
  }

  const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    folder: "users",
    width: 150,
    crop: "scale",
  });

  const user = await User.create({
    name,
    email,
    password,
    photo: {
      id: result.public_id,
      secure_url: result.secure_url,
    },
  });

  cookieToken(user, res);
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  //check for presence of email and password
  if (!email || !password) {
    return next(new CustomError("Please provide email and password", 400));
  }

  //get user from DB
  const user = await User.findOne({ email }).select("+password");

  //check if user is registered or not
  if (!user) {
    return next(new CustomError("Incorrect email or password", 400));
  }

  //match the password
  const isPasswordCorrect = await user.isValidPassword(password);

  //check if password is correct or not
  if (!isPasswordCorrect) {
    return next(new CustomError("Incorrect email or password", 400));
  }

  //if all goes good we send the token
  cookieToken(user, res);
});

exports.logout = BigPromise(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
});

exports.forgotPassword = BigPromise(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new CustomError("Email not found", 400));
  }

  const forgotToken = user.getForgotPasswordToken();

  await user.save({ validateBeforeSave: false });

  const myURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${forgotToken}`;

  const message = `Copy paste this link in your URL and hit enter \n\n ${myURL}`;

  try {
    await mailHelper({
      email,
      subject: "Password Reset email mb-e-commerce-store",
      message,
    });
    res.status(200).json({
      success: true,
      message: "mail sent successfully",
    });
  } catch (error) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new CustomError(error.message, 500));
  }
});

exports.passwordReset = BigPromise(async (req, res, next) => {
  const newToken = req.params.token;
  const encryToken = crypto.createHash("sha256").update(newToken).digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: encryToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new CustomError("Token is inavlid or experied", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new CustomError("password and confirm password do not match", 400)
    );
  }

  user.password = req.body.password;
  user.forgotPasswordExpiry = undefined;
  user.forgotPasswordToken = undefined;
  await user.save();

  //send a json response or send a token
  cookieToken(user, res);
});

//secured

exports.getLoggedInUserDetails = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.changePassword = BigPromise(async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId).select("+password");

  const isCorrectOldPassword = await user.isValidPassword(req.body.oldPassword);

  if (!isCorrectOldPassword) {
    return next(new CustomError("old password is incorrect", 400));
  }

  user.password = req.body.password;
  await user.save();
  cookieToken(user, res);
});

exports.updateUserDetails = BigPromise(async (req, res, next) => {
  if (!req.body.name || !req.body.email) {
    return next(new CustomError("Email and Name must be there", 400));
  }

  const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  if (req.files && req.files.photo !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.photo.id;

    //delete old photo
    const resp = await cloudinary.v2.uploader.destroy(imageId);

    //uploading new photo
    let file = req.files.photo;
    const result = await cloudinary.v2.uploader.upload(
      req.files.photo.tempFilePath,
      {
        folder: "users",
        widhth: 150,
        crop: "scale",
      }
    );

    //updating the new data object
    newData.photo = {
      id: result.public_id,
      secure_url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// admin

exports.adminGetAllUser = BigPromise(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    users,
  });
});

exports.adminGetOneUser = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new CustomError("No user found", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.adminUpdateOneUserDetails = BigPromise(async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.role) {
    return next(new CustomError("Email, Role and Name must be there", 400));
  }

  const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

exports.adminDeleteSingleUser = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new CustomError("No user found", 401));
  }

  const imageId = user.photo.id;
  await cloudinary.v2.uploader.destroy(imageId);
  await User.deleteOne(user);
  res.status(200).json({
    success: true,
  });
});
