const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const channels = require("./../data.json"); //importing the channels
const Channel = require("./../models/channel.model");
const mongoose = require("mongoose");
const { isAuthenticated } = require("./../middleware/jwt.middleware");

//GET all existing channels

router.get("/channels", async (req, res, next) => {
  try {
    /* const { name, channelImage, genre } = req.body */

    const allChannels = await Channel.find();
    console.log("allChannels", allChannels);

    //server response
    res.status(200).json(allChannels);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// POST - create/add channels

router.post("/channels", async (req, res, next) => {
  try {
    //get the data
    const { channelName, genre, description, channelPrice } = req.body;

    //save the data
    const newChannel = await Channel.create({
      channelName,
      genre,
      description,
      channelPrice,
    });
    console.log("Created", newChannel);

    //display the response
    res.status(201).json(newChannel);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//GET ->  router.get(/channel/:channelId) specific channel

router.get("/channels/:channelId", async (req, res, next) => {
  try {
    const { channelId } = req.params;

    //see if the id is valid or not
    if (!mongoose.Types.ObjectId.isValid(channelId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    //find the id
    const foundChannel = await Channel.findById(channelId);
    console.log("Found Id is:", foundChannel);

    //response to the server
    res.status(200).json(foundChannel);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//PUT - Update a specific channel

router.put("/channels/:channelId", async (req, res, next) => {
  try {
    //get the channel ID
    const { channelId } = req.params;

    //validate the id
    if (!mongoose.Types.ObjectId.isValid(channelId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    //values to be updated

    const {
      channelName,
      genre,
      platform,
      allowedCountries,
      description,
      channelPrice,
    } = req.body;

    const updatedChannel = await Channel.findByIdAndUpdate(
      channelId,
      {
        channelName,
        genre,
        platform,
        allowedCountries,
        description,
        channelPrice,
      },
      { new: true }
    );
    //send the response of the updated value
    res.status(200).json(updatedChannel);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//DELETE - Delete a channel

router.delete("/channels/delete/:channelId", async (req, res, next) => {
  try {
    //get the id
    const { channelId } = req.params;

    //validate the id
    if (!mongoose.Types.ObjectId.isValid(channelId)) {
      res.status(400).json({ message: "Invalid Id object" });
      return;
    }

    //Indicate the id to be deleted from the collection
    const deleteChannel = await Channel.findByIdAndDelete(channelId);

    res.status(204).send();
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
