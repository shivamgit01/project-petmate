const express = require("express");
const {
  newRequest,
  getSingleRequest,
  getUserRequests,
  updateRequestStatus,
  getAdoptRequestsById,
} = require("../controllers/reqController");
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/adopt/:id").post(isAuthenticated, newRequest);

router
  .route("/adopt/:id")
  .get(isAuthenticated, getSingleRequest)
  .put(isAuthenticated, updateRequestStatus);

router.route("/requests").get(isAuthenticated, getUserRequests);

router.route("/request/:id").get(isAuthenticated, getAdoptRequestsById);

module.exports = router;
