var express = require("express");
var router = express.Router();
var AlbumService = require("../services/albumService");
var isAdmin = require("../middleware/isAdmin");

router.get("/all", (req, res) => {
  return AlbumService.findAll(req, res);
});

router.get("/:id", (req, res) => {
  return AlbumService.getOne(req, res);
});

router.post("/add", isAdmin, (req, res) => {
  return AlbumService.addAlbum(req, res);
});

router.delete("/:id", isAdmin, (req, res) => {
  return AlbumService.deleteAlbum(req, res);
});

module.exports = router;
