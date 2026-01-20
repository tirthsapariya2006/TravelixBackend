const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");
const userController = require("../controllers/userController");

router.get("/me", verifyFirebaseToken, userController.getProfile);

module.exports = router;
