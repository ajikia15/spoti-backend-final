const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "artist",
    },
    songs: [
      {
        name: { type: String, required: true },
        _id: { type: mongoose.Schema.Types.ObjectId },
      },
    ],
    releaseDate: { type: Date, required: true },
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

const Model = mongoose.model("album", albumSchema);
module.exports = Model;
