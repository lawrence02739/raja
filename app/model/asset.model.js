const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    assetName: String,
    price:Number,
})
const user = mongoose.model('asset', Schema)

module.exports = user;