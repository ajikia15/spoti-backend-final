var express = require("express");
var router = express.Router();
var AlbumService = require("../services/albumService");

router.get("/all", (req, res) => {
  return AlbumService.findAll(req, res);
});

router.get("/:id", (req, res) => {
  return AlbumService.getOne(req, res);
});

router.post("/add", (req, res) => {
  return AlbumService.addAlbum(req, res);
});

router.delete("/:id", (req, res) => {
  return AlbumService.deleteAlbum(req, res);
});

module.exports = router;
