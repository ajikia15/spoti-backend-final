var express = require("express");
var router = express.Router();
var SongService = require("../services/songService");

router.get("/all", (req, res) => {
  return SongService.findAll(req, res);
});

router.get("/:id", (req, res) => {
  return SongService.getOne(req, res);
});

router.post("/add", (req, res) => {
  return SongService.addSong(req, res);
});

module.exports = router;
