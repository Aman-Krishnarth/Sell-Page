const mongoose = require("mongoose");
const book = require("./book");

const cartSchema = new mongoose.Schema({
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "book",
	default: []
   }],
});

module.exports = mongoose.model("cart", cartSchema);
