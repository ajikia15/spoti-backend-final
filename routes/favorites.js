var express = require("express");
var router = express.Router();
var FavoriteService = require("../services/FavoriteService");

router.get("/all", (req, res) => {
  return FavoriteService.findAll(req, res);
});

router.get("/:id", (req, res) => {
  return FavoriteService.getOne(req, res);
});

router.post("/add", (req, res) => {
  return FavoriteService.addFavorite(req, res);
});
router.delete("/:id", (req, res) => {
  return FavoriteService.deleteFavorite(req, res);
});
module.exports = router;
