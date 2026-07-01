const mongoose = require("mongoose");

const CoffeeSchema = new mongoose.Schema({

    name: String,

    price: Number

});

module.exports = mongoose.model("Coffee", CoffeeSchema);