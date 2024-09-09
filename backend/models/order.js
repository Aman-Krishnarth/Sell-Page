const mongoose = require("mongoose");

// order confirm
// order prepared
// delivered
// out for delivery

const orderSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
  },
  userId: {
    type: String,
    default: "8822939dnfsdfes",
  },
  itemStatus: {
    type: String,
    default: "Order Confirm",
  },
  itemOrderDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("order", orderSchema);
