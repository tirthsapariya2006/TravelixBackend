const User = require("../models/user");

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    // Find user in MongoDB
    let user = await User.findOne({ firebaseUid: req.user.uid }).populate("cartItems.tour");

    // If not exists, create a new MongoDB user
    if (!user) {
      user = await User.create({
        firebaseUid: req.user.uid,
        email: req.user.email,
      });
    }

    res.json({
      firebaseUid: user.firebaseUid,
      email: user.email,
      cartItems: user.cartItems,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
