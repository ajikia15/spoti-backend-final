const SongModel = require("../models/song");
const AlbumModel = require("../models/album");

module.exports = {
  findAll: (req, res) => {
    SongModel.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  },
  addSong: async (req, res) => {
    try {
      const savedItem = await new SongModel(req.body).save();
      res.json(savedItem);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getOne: async (req, res) => {
    try {
      const song = await SongModel.findById(req.params.id);
      res.json(song);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteSong: async (req, res) => {
    try {
      const song = await SongModel.findByIdAndDelete(req.params.id);
      if (!song) {
        return res.status(404).json({ message: "Song not found" });
      }

      await AlbumModel.updateMany(
        {},
        { $pull: { songs: { songId: song.songId } } }
      );

      res.json({ message: "Song has been deleted and removed from its album" });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
