// controllers/userController.js
const User = require("../models/user");

// GET /api/user/me
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      {
        $setOnInsert: {
          firebaseUid: req.user.uid,
          email: req.user.email,
        },
      },
      {
        new: true,
        upsert: true,
      }
    ).populate("cartItems.tour");

    res.status(200).json({
      id: user._id,
      firebaseUid: user.firebaseUid,
      email: user.email,
      cartItems: user.cartItems,
      likeItems: user.likeItems,
    });
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({
      message: "Failed to load user profile",
    });
  }
};
