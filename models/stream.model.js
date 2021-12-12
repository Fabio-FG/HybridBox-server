const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const streamSchema = new Schema(
    {
        streamName: {type: String, required: true},
        streamImage: {type: String, default:'defaultImage.jpg'},
        streamWebsite: {type: String},
        streamPrice: {type: Number, default:0 },
        platform: [ ],
        allowedCountries: [ ]
    }
);


module.exports = model("Stream", streamSchema);