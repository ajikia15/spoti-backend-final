var express = require("express");
var router = express.Router();
var ArtistService = require("../services/artistService");

router.get("/all", (req, res) => {
  return ArtistService.findAll(req, res);
});

router.get("/:id", (req, res) => {
  return ArtistService.getOne(req, res);
});

router.post("/add", (req, res) => {
  return ArtistService.addStudent(req, res);
});

module.exports = router;
