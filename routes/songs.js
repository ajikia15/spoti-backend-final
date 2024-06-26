var express = require("express");
var router = express.Router();
var SongService = require("../services/songService");
var isAdmin = require("../middleware/isAdmin");

router.get("/all", (req, res) => {
  return SongService.findAll(req, res);
});

router.get("/:id", (req, res) => {
  return SongService.getOne(req, res);
});

router.post("/add", isAdmin, (req, res) => {
  return SongService.addSong(req, res);
});

router.delete("/:id", isAdmin, (req, res) => {
  return SongService.deleteSong(req, res);
});
module.exports = router;
