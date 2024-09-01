const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    
    name: {
        type: String,
    },
    coverUrls: [
        {type: String}
    ],
    email: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String
    },
    mrp: {
        type: Number,
    },
    discountedPrice: {
        type: Number,
    },
    retailPrice: {
        type: Number
    }

});

module.exports = mongoose.model("book", bookSchema);
