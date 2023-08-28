const express = require("express");
const { isLoggedIn } = require("../middlewares/userAuth");
const {
  addReview,
  deleteReview,
  getReviwesOnlyForOneProduct,
} = require("../controllers/reviewController");

const router = express.Router();

router.route("/review").put(isLoggedIn, addReview);
router.route("/review/:productId").delete(isLoggedIn, deleteReview);
router.route("/reviews/:productId").get(getReviwesOnlyForOneProduct);

module.exports = router;
