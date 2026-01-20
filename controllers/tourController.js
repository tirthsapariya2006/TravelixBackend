const tourModel = require("../models/tour");
const mongoose = require("mongoose");

exports.addTour = async (req, res) => {
  try {
    const tour = new tourModel(req.body);
    await tour.save();
    return res.status(201).json(tour);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getAllTour = async (req, res) => {
  try {
    const tours = await tourModel.find();
    return res.status(200).json(tours);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.findTour = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const tour = await tourModel.findById(req.params.id);
    if (!tour) return res.status(404).json({ error: "Tour not found" });
    return res.status(200).json(tour);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await tourModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tour) return res.status(404).json({ error: "Tour not found" });
    return res.status(200).json(tour);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await tourModel.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ error: "Tour not found" });
    return res.status(200).json({ message: "Tour deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
