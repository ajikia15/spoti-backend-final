const mongoose = require("mongoose");

const albumSchema = new mongoosese.Schema(
  {
    albumId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    artistId: { type: String, required: true },
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

const Model = mongoose.model("Album", albumSchema);
module.exports = Model;
