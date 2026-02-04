const User = require("../models/user");
const Tour = require("../models/tour");

exports.getLike = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid }).populate(
      "likeItems.tour",
    );
    res.json({ likeItems: user.likeItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToLike = async (req, res) => {
  try {
    const { tourId, like } = req.body;

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

    user.likeItems.push({
      tour: tourId,
      like: like,
    });

    await user.save();
    await user.populate("likeItems.tour");

    res.json({ likeItems: user.likeItems });
  } catch (err) {
    console.error("Add to like error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromLike = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });

    user.likeItems = user.likeItems.filter(
      (item) => item.tour.toString() !== req.params.tourId,
    );

    await user.save();
    await user.populate("likeItems.tour");

    res.json({ likeItems: user.likeItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};