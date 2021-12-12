const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    profileImage: { type: String, default: 'https://tinyurl.com/96bb7ks' },
    listOfChannels: [{ type: Schema.Types.ObjectId, ref:'Channel'} ],
    listOfStreams: [{ type: Schema.Types.ObjectId, ref:'Stream'} ]
  }
);

module.exports = model("User", userSchema);
