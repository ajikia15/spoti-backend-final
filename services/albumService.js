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
      const artistExists = await ArtistModel.exists({ _id: req.body.artistId });
      if (!artistExists) {
        return res.status(404).json({ message: "Artist not found" });
      }

      const savedAlbum = await new AlbumModel(req.body).save();
      await ArtistModel.updateOne(
        { _id: savedAlbum.artistId },
        {
          $push: {
            albums: {
              name: savedAlbum.name,
              _id: savedAlbum._id,
            },
          },
        }
      );

      res.json(savedAlbum);
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
      const album = await AlbumModel.findById(req.params.id);
      if (!album) {
        return res.status(404).json({ message: "Album not found" });
      }

      await ArtistModel.updateOne(
        { _id: album.artistId },
        { $pull: { albums: { _id: album._id } } }
      );

      await AlbumModel.findByIdAndDelete(req.params.id);
      res.json({
        message: "Album has been deleted and removed from its artist",
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
