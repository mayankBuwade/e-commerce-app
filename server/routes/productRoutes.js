const express = require("express");
const {
  getAllProduct,
  getSingleProduct,
  addPorduct,
  adminGetAllProduct,
  adminUpdateOneProduct,
  adminDeleteSingleProduct,
} = require("../controllers/productController");
const { isLoggedIn, customRole } = require("../middlewares/userAuth");

const router = express.Router();

// user routes
router.route("/products").get(getAllProduct);
router.route("/product/:id").get(getSingleProduct);
// admin routes
router
  .route("/admin/product/add")
  .post(isLoggedIn, customRole("admin"), addPorduct);

router
  .route("/admin/products")
  .get(isLoggedIn, customRole("admin"), adminGetAllProduct);

router
  .route("/admin/product/:id")
  .put(isLoggedIn, customRole("admin"), adminUpdateOneProduct)
  .delete(isLoggedIn, customRole("admin"), adminDeleteSingleProduct);

module.exports = router;
