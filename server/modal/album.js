const mongoose  = require('mongoose');

const albumschema = new mongoose.Schema({
title : String,
artist: String,
releaseDate : Date,
coverImage : String,
audioFile : String,
})
module.exports = mongoose.model("album", albumschema)