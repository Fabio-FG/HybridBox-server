const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

const Channel = require("./../models/channel.model");
const streams = require("./../data.streams.json");
const Stream = require("./../models/stream.model");
const mongoose = require("mongoose");
const { isAuthenticated } = require("./../middleware/jwt.middleware");

//Stream routes

//GET all Stream services available from the DB

router.get("/api/streams", async (req, res, next) => {
  try {
    /* //get all the data
    const { streamName , streamImage, streamPrice } = req.body; 
 */
    //save all the data
    const allStreams = await Stream.find();
   

    //response to the server
    res.status(200).json(allStreams);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Post Create new Streaming Services

router.post("/api/streams/create", async (req, res, next) => {
  try {
    //get the data
    const { streamName, streamPrice, streamWebsite , description } = req.body;

    //create
    const createdStream = await Stream.create({
      streamName,
      streamPrice,
      streamWebsite,
      description,
    });

    //response
    res.status(201).json(createdStream);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Get a specific streaming service ID

router.get("/api/streams/:streamId", async (req, res, next) => {
  //get the id
  try {
    //get the id
    const { streamId } = req.params;

    //validate the id
    if (!mongoose.Types.ObjectId.isValid(streamId)) {
      res.status(400).json({ message: "Invalid Object id" });
      return;
    }

    //find the id
    const foundStream = await Stream.findById(streamId);

    //send the response
    res.status(200).json(foundStream);

  } catch (error) {
    res.status(500).json(error.message);
  }
});


//Update a stream using PUT

router.put("/api/streams/:streamId", async(req, res, next) => {
   try{

       //find the id
       const { streamId } = req.params;
       
       //get the stream object and values to update
       const { streamName, streamImage, streamPrice, streamWebsite, platform, allowedCountries, description } = req.body;

    //validate the id
    if(!mongoose.Types.ObjectId.isValid(streamId)){
        res.status(400).json({message: "Invalid id object"})
        return;
    }

    //find and update the id
    const updateStream = await Stream.findByIdAndUpdate(streamId, { streamName, streamImage, streamPrice, streamWebsite, platform, allowedCountries, description}, { new: true});

    //response to the server
    res.status(200).json(updateStream);

}catch(error){
    res.status(500).json(error.message)
} 



})


//DELETE  streams

router.delete("/api/streams/:streamId", async (req, res, next) => {
    try{
        //get the id to delete
    const { streamId } = req.params;

    //see if id is valid
    if(!mongoose.Types.ObjectId.isValid){
        res.status(400).json({message: "invalid id object"})
        return;
    }

    //delete the stream by id
    const deleteStream = await Stream.findByIdAndDelete(streamId);

    //response to the server
    res.status(204).send(); 
    
    }catch(error){
        res.status(500).json(error.message)
    }
})



module.exports = router;
