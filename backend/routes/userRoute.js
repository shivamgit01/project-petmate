const express = require("express");
const {
  registerUser,
  loginUser,
  userLogout,
  getUserDetails,
  updateUserDetails,
  getAllUserDetails,
  getUserDetailsById,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(userLogout);

router.route("/profile").get(isAuthenticated, getUserDetails);

router.route("/user/update").put(isAuthenticated, updateUserDetails);

router
  .route("/admin/users")
  .get(isAuthenticated, authorizedRoles("admin"), getAllUserDetails);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizedRoles("admin"), getUserDetailsById)
  .put(isAuthenticated, authorizedRoles("admin"), updateUserRole)
  .delete(isAuthenticated, authorizedRoles("admin"), deleteUser);

module.exports = router;
