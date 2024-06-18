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
      const album = await AlbumModel.findById(req.body.albumId);
      if (!album) {
        return res.status(404).json({ message: "Album not found" });
      }

      // let nextTrackNumber = 1;
      // if (album.songs && album.songs.length > 0) {
      //   const maxTrackNumber = album.songs.reduce(
      //     (max, song) => Math.max(max, song.trackNumber),
      //     0
      //   );
      //   nextTrackNumber = maxTrackNumber + 1;
      // }

      // if (!req.body.trackNumber) {
      //   req.body.trackNumber = nextTrackNumber;
      // }
      const savedSong = await new SongModel(req.body).save();
      await AlbumModel.updateOne(
        { _id: savedSong.albumId },
        {
          $push: {
            songs: {
              name: savedSong.name,
              _id: savedSong._id,
              trackNumber: savedSong.trackNumber,
            },
          },
        }
      );
      res.json(savedSong);
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
        { _id: song.albumId },
        { $pull: { songs: { _id: song._id } } }
      );
      await SongModel.findByIdAndDelete(req.params.id);

      res.json({ message: "Song has been deleted and removed from its album" });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
