const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");
const likeController = require("../controllers/likeController");

router.get("/", verifyFirebaseToken, likeController.getLike);
router.post("/add", verifyFirebaseToken, likeController.addToLike);
router.delete("/remove/:tourId", verifyFirebaseToken, likeController.removeFromLike);

module.exports = router;
