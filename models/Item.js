const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    _id : Number,
    name : {type: String, required : true},
    decription : String,
    price : Number
});

module.exports = mongoose.model(`Item`,itemSchema);