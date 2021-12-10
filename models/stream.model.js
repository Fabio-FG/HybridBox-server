const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const streamSchema = new Schema(
    {
        streamName: {type: String, required: true},
        streamImage: {type: String, default:'defaultImage.jpg'},
        streamWebsite: {type: String},
        streamPrice: {Type: Number},
        platform: [ ],
        allowedCountries: [ ]
    }
);


module.exports = model("Stream", streamSchema);