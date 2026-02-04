const User = require("../models/user");
const Tour = require("../models/tour");

exports.getCart = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid }).populate(
      "cartItems.tour",
    );
    res.json({ cartItems: user.cartItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { tourId, quantity = 1, setExactQuantity = false } = req.body;

    if (!tourId) return res.status(400).json({ message: "tourId is required" });

    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    let user = await User.findOne({ firebaseUid: req.user.uid });

    if (!user) {
      user = await User.create({
        firebaseUid: req.user.uid,
        email: req.user.email,
      });
    }

    const existingItem = user.cartItems.find(
      (item) => item.tour.toString() === tourId
    );

    if (existingItem) {
      if (setExactQuantity) {
        existingItem.quantity = quantity;
      } else {
        existingItem.quantity += quantity; 
      }
    } else {
      user.cartItems.push({
        tour: tourId,
        quantity,
        priceAtAddTime: tour.price,
      });
    }

    await user.save();
    await user.populate("cartItems.tour");

    res.json({ cartItems: user.cartItems });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });

    user.cartItems = user.cartItems.filter(
      (item) => item.tour.toString() !== req.params.tourId,
    );

    await user.save();
    await user.populate("cartItems.tour");

    res.json({ cartItems: user.cartItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    user.cartItems = [];
    await user.save();

    res.json({ cartItems: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { tourId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) return res.status(400).json({ message: "Invalid quantity" });

    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    const item = user.cartItems.find((i) => i.tour.toString() === tourId);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    item.quantity = quantity;

    await user.save();
    await user.populate("cartItems.tour");

    res.json({ cartItems: user.cartItems });
  } catch (err) {
    console.error("Update cart item error:", err);
    res.status(500).json({ message: err.message });
  }
};
