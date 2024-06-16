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
        songId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
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
