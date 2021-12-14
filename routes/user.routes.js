const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");

// GET /api/users/current  - Get current user info
router.get("/api/users/current", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;
    const user = await User.findById(currentUser._id).populate(
      "listOfChannels"
    );

    res.status(200).json(user);
  } catch (error) {
    next(error.message);
  }
});

// PUT /api/users/current  - Update the current user
router.put("/api/users/current", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;
    const { email, name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { email, name },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error.message);
  }
});

// PUT /api/users/current  - Update the current user
router.post(
  "/api/users/channels/:channelId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      // If the user is authenticated we can access the JWT payload via req.payload
      // req.payload holds the user info that was encoded in JWT during login.

      const currentUser = req.payload;

      console.log(currentUser);
      const { channelId } = req.params;

      const theUser = await User.findById(currentUser._id);

      console.log("listofchannels------------", theUser.listOfChannels);

      if (!theUser.listOfChannels.includes(channelId)) {
        const updatedUser = await User.findByIdAndUpdate(
          theUser._id,
          { $push: { listOfChannels: channelId } },
          { new: true }
        );

        res.status(200).json(updatedUser);
      } else {
        console.log("Channel already on the list!");
        res.status(304).json({ message: "Channel already on the list!" });
      }
    } catch (error) {
      next(error.message);
    }
  }
);

module.exports = router;
