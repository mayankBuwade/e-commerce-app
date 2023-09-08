const {
  signup,
  login,
  logout,
  forgotPassword,
  passwordReset,
  getLoggedInUserDetails,
  changePassword,
  updateUserDetails,
  adminGetAllUser,
  adminGetOneUser,
  adminUpdateOneUserDetails,
  adminDeleteSingleUser,
} = require("../controllers/userController");
const { isLoggedIn, customRole } = require("../middlewares/userAuth");

const router = require("express").Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").post(passwordReset);

//secured user routes
router.route("/userdashboard").get(isLoggedIn, getLoggedInUserDetails);
router.route("/password/update").post(isLoggedIn, changePassword);
router.route("/userdashboard/update").put(isLoggedIn, updateUserDetails);

//secured admin routes
router
  .route("/admin/users")
  .get(isLoggedIn, customRole("admin"), adminGetAllUser);

router
  .route("/admin/user/:id")
  .get(isLoggedIn, customRole("admin"), adminGetOneUser)
  .put(isLoggedIn, customRole("admin"), adminUpdateOneUserDetails)
  .delete(isLoggedIn, customRole("admin"), adminDeleteSingleUser);

module.exports = router;
