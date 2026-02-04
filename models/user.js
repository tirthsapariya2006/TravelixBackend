// models/User.js
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
    quantity: { type: Number, default: 1, min: 1 },
    priceAtAddTime: { type: Number, required: true },
  },
  { _id: false },
);

const likeItemSchema = new mongoose.Schema(
  {
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
    like: { type: Boolean, default: false },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    cartItems: { type: [cartItemSchema], default: [] },
    likeItems: { type: [likeItemSchema], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
