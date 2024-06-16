const favoriteModel = require("../models/favorite");
module.exports = {
  findAll: (req, res) => {
    // maybe based on the user?
    favoriteModel
      .find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  },
  addFavorite: async (req, res) => {
    try {
      const savedItem = await new favoriteModel(req.body).save();
      res.json(savedItem);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getOne: async (req, res) => {
    try {
      const favorite = await favoriteModel.findById(req.params.id);
      res.json(favorite);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteFavorite: async (req, res) => {
    try {
      const favorite = await favoriteModel.findByIdAndDelete(req.params.id);
      if (!favorite) {
        return res.status(404).json({ message: "Favorite not found" });
      }
      res.json({ message: "Favorite has been deleted" });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
