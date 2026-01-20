    const mongoose = require('mongoose');

    const tourSchema = new mongoose.Schema({
        placeName: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        reviews: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            default: 0
        },
        duration: {
            type: String,
            required: true
        },
        bestTime: {
            type: String
        },
        location: {
            type: String,
            required: true
        },
        highlights: {
            type: [String],
            default: []
        },
        description: {
            type: String,
            required: true
        }
    }, { timestamps: true });

    module.exports = mongoose.model('Tour', tourSchema);