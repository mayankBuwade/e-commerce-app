const Product = require("../models/product");
const BigPromise = require("../middlewares/bigPromise.js");
const CustomError = require("../utils/customError");
const cloudinary = require("cloudinary");
const WhereClause = require("../utils/whereClause");

// user controller

exports.getAllProduct = BigPromise(async (req, res, next) => {
  const resultPerPage = 6;
  const totalProductCount = await Product.countDocuments();

  const productsObj = new WhereClause(Product.find(), req.query)
    .search()
    .filter();

  let products = await productsObj.base;

  const filteredProductNumber = 0 || products.length;

  if (products) {
    productsObj.pager(resultPerPage);
    products = await productsObj.base.clone();
  }

  res.status(200).json({
    success: true,
    products,
    filteredProductNumber,
    totalProductCount,
  });
});

exports.getSingleProduct = BigPromise(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new CustomError("No product found with this id", 401));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

exports.addPorduct = BigPromise(async (req, res, next) => {
  //images
  let imageArray = [];

  if (!req.files || !req.files.photos) {
    return next(new CustomError("images are required", 401));
  }

  //if there is only a single photo then it is available as object so we are converting it into an array after checking, so the loop can work properly
  req.files.photos = Array.isArray(req.files.photos)
    ? req.files.photos
    : [req.files.photos];

  for (let index = 0; index < req.files.photos.length; ++index) {
    const result = await cloudinary.v2.uploader.upload(
      req.files.photos[index].tempFilePath,
      {
        folder: "products",
      }
    );
    imageArray.push({
      id: result.public_id,
      secure_url: result.secure_url,
    });
  }

  req.body.photos = imageArray;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

exports.adminGetAllProduct = BigPromise(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

exports.adminUpdateOneProduct = BigPromise(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  //images
  let imageArray = [];

  if (!product) {
    return next(new CustomError("No product found with this id", 401));
  }

  if (req.files) {
    //destroy old photos
    for (let index = 0; index < product.photos.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(photos[index].id);
    }

    //upload and save the images
    for (let index = 0; index < req.files.photos.length; index++) {
      let result = await cloudinary.v2.uploader.upload(
        req.files.photos[index].tempFilePath,
        {
          folder: "products", //folder name can be go into env
        }
      );
      imageArray.push({
        id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  req.body.photos = imageArray;
  req.body.user = req.user.id;

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.adminDeleteSingleProduct = BigPromise(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new CustomError("No product found with this id", 401));
  }

  //destroy old photos
  for (let index = 0; index < product.photos.length; index++) {
    await cloudinary.v2.uploader.destroy(product.photos[index].id);
  }

  let response = await Product.deleteOne({ _id: product._id });

  res.status(200).json({
    success: true,
    message: "Product deleted!",
  });
});
