var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("query params", req.query);
  res.status(200).json({ message: "hi from server" });
});

router.post("/test", (req, res) => {
  console.log("111111", req.body);
  res.status(200).json({
    ...req.body,
    firstName: "anri",
    lastName: "morchiladze",
  });
});

module.exports = router;
