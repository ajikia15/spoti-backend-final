const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dob: { type: String, required: true },
    albums: [
      {
        name: { type: String },
      },
    ],
    bio: { type: String },
  },
  {
    timestamps: true,
    read: "nearest",
    writeConcern: {
      w: "majority",
      wtimeoutMS: 30000,
      j: true,
    },
  }
);

const Model = mongoose.model("artist", artistSchema);
module.exports = Model;
