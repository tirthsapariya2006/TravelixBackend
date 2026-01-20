const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");
const cartController = require("../controllers/cartController");

router.get("/", verifyFirebaseToken, cartController.getCart);
router.post("/add", verifyFirebaseToken, cartController.addToCart);
router.delete("/remove/:tourId", verifyFirebaseToken, cartController.removeFromCart);
// router.delete("/clear", verifyFirebaseToken, cartController.clearCart);
router.put("/update/:tourId", verifyFirebaseToken, cartController.updateCartItem);

module.exports = router;
