const tourModel = require("../model/tour")

exports.addTour = async (req, res) => {
    const tour = await new tourModel(req.body);
    await tour.save();
    return res.status(200).json(tour);
}

exports.getAllTour = async (req, res) => {
    const tour = await tourModel.find();
    return res.status(200).json(tour);
}

exports.findTour = async (req, res) => {
    const tour = await tourModel.findById(req.params.id);
    return res.status(200).json(tour);
}

exports.updateTour = async (req, res) => {
    const tour = await tourModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.status(200).json(tour);
}

exports.deleteTour = async (req, res) => {
    const tour = await tourModel.findByIdAndDelete(req.params.id);
    return res.status(200).json("tour deleted");
}