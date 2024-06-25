var express = require("express");
var router = express.Router();
var ArtistService = require("../services/artistService");
var isAdmin = require("../middleware/isAdmin");

router.get("/all", (req, res) => {
  return ArtistService.findAll(req, res);
});

router.get("/:id", (req, res) => {
  return ArtistService.getOne(req, res);
});

router.post("/add", isAdmin, (req, res) => {
  return ArtistService.addArtist(req, res);
});
router.delete("/:id", isAdmin, (req, res) => {
  return ArtistService.deleteArtist(req, res);
});

module.exports = router;
