const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const channelSchema = new Schema(
    {
        channelName: {type: String, required: true},
        channelImage: {type: String, default:'defaultImage.jpg'},
        genre: { type: String, required: true},
        channelWebsite: {type: String},
        channelPrice: {Type: Number},
        platform: [ ],
        allowedCountries: [ ]
    }
);


module.exports = model("Channel", channelSchema);
