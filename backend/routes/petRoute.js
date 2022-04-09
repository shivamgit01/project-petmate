const express = require("express");
const {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
  getPetDetails,
  getMyPets,
} = require("../controllers/petController");
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/pets").get(getAllPets);

router.route("/newpet").post(isAuthenticated, createPet);

router.route("/pet/:id").put(isAuthenticated, updatePet).get(getPetDetails);

router.route("/remove/:id").delete(isAuthenticated, deletePet);

router.route("/mypets").get(isAuthenticated, getMyPets);

module.exports = router;
