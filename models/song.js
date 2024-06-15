const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    songId: { type: String, required: true, unique: true },
    albumId: { type: String, required: true },
    artistId: { type: String, required: true },
    duration: { type: String },
    genre: { type: String },
    trackNumber: { type: Number },
    favoritedAmount: { type: Number, default: 0 },
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
const Model = mongoose.model("Song", songSchema);
module.exports = Model;
