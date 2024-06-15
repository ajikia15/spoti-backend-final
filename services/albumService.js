const AlbumModel = require("../models/album");
const ArtistModel = require("../models/artist");

module.exports = {
  findAll: (req, res) => {
    AlbumModel.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  },
  addAlbum: async (req, res) => {
    try {
      const savedItem = await new AlbumModel(req.body).save();
      res.json(savedItem);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getOne: async (req, res) => {
    try {
      const album = await AlbumModel.findById(req.params.id);
      res.json(album);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteAlbum: async (req, res) => {
    try {
      const album = await AlbumModel.findByIdAndDelete(req.params.id);
      if (!album) {
        return res.status(404).json({ message: "Album not found" });
      }

      await ArtistModel.updateMany(
        {},
        { $pull: { albums: { albumId: album.albumId } } }
      );

      res.json({
        message: "Album has been deleted and removed from its artist",
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
