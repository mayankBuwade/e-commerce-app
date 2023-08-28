const Product = require("../models/product");
const BigPromise = require("../middlewares/bigPromise.js");

exports.addReview = BigPromise(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isUserAlreadyReviewed = product.reviews.find(
    (rev) => rev.user.toString() === review.user.toString()
  );

  if (isUserAlreadyReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === review.user.toString()) {
        rev.comment = review.comment;
        rev.rating = review.rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  // adjust ratings
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.numberOfReviews;

  //save
  await product.save({ validateBeforeSave: true });

  res.status(200).json({
    succes: true,
  });
});

exports.deleteReview = BigPromise(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  const reviews = product.reviews.filter(
    (rev) => rev.user.toString() !== req.user._id.toString()
  );

  const numberOfReviews = reviews.length;

  let ratings = 0;

  if (numberOfReviews > 0) {
    ratings =
      reviews.reduce((acc, item) => item.rating + acc, 0) / numberOfReviews;
  }

  //update the product
  await Product.findByIdAndUpdate(
    productId,
    {
      reviews,
      numberOfReviews,
      ratings,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModifify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.getReviwesOnlyForOneProduct = BigPromise(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
