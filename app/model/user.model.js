const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String,
    email:{type:String,unique:true},
    password:{type:String},
    accessToken:String,
    refreshToken:String,
    isActive:{ type: Boolean, default: true },
    isDeleted:{ type: Boolean, default: false },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
    // deletedAt: { type: Date, default: Date.now },
})
const user = mongoose.model('user', Schema)

module.exports = user;