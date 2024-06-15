const mongoose = require("mongoose");
const favoriteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    favoriteId: { type: String, required: true },
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

const Model = mongoose.model("Favorite", favoriteSchema);
module.exports = Model;
