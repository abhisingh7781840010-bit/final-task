
const express = require("express");
const router = express.Router();

const {
  predictCareer,
} = require("../controllers/prediction.controller");

router.post("/", predictCareer);

module.exports = router;