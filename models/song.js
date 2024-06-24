const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "album",
    },
    // artistId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "artist",
    // },
    duration: { type: String },
    genre: { type: String },
    trackNumber: { type: Number, default: 1 },
    favoritedAmount: { type: Number, default: 0 },
    listenAmount: { type: Number, default: 0 },
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
const Model = mongoose.model("song", songSchema);
module.exports = Model;
