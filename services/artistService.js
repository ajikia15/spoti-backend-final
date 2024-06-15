const ArtistModel = require("../models/artist");
const SongModel = require("../models/song");
const AlbumModel = require("../models/album");

module.exports = {
  findAll: (req, res) => {
    ArtistModel.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  },
  addArtist: async (req, res) => {
    try {
      const savedItem = await new ArtistModel(req.body).save();
      res.json(savedItem);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getOne: async (req, res) => {
    try {
      const artist = await ArtistModel.findById(req.params.id);
      res.json(artist);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteArtist: async (req, res) => {
    try {
      const artist = await ArtistModel.findByIdAndDelete(req.params.id);
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }

      await SongModel.deleteMany({ artistId: artist.artistId });

      await AlbumModel.deleteMany({ artistId: artist.artistId });

      res.json({
        message: "Artist and their songs and albums have been deleted",
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
