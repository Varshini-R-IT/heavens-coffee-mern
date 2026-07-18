const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerName: String,
  coffee: String,
  price: Number,
  status: {
    type: String,
    default: "Confirmed"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);