const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  {
    collection: "users",
    timestamps: true,
    writeConcern: {
      w: "majority",
      j: true,
      wtimeoutMS: 30000,
    },
    read: "nearest",
  }
);

const Model = mongoose.model("User", userSchema);
module.exports = Model;
