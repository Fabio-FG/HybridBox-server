require("../db");
const channels = require("./../data.json");
const Channel = require("./../models/channel.model");

//import and access the streams
const streams = require("./../data.streams.json");
const Stream = require("./../models/stream.model");


//This will connect the data.json to the DB by saving it in a variable
// Whenever data.json has more content , first drop the database and then seed. Otherwise the data will get duplicated.
const createChannels = async ()=> {
    const channelsFromDB = await Channel.insertMany(channels);
    console.log("inserted on DB", channelsFromDB );
}

createChannels();


const createStreams = async () => {
    const streamsFromDB = await Stream.insertMany(streams);
    console.log("Inserted on DB", streamsFromDB );
}

createStreams();