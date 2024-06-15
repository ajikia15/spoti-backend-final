const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dob: { type: String, required: true },
    artistId: { type: String, required: true, unique: true },
    albums: [
      {
        albumId: { type: String },
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

const Model = mongoose.model("Artist", artistSchema);
module.exports = Model;
