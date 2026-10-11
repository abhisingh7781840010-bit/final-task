
const express = require("express");
const router = express.Router();

const {
    saveProfile
} = require("../controllers/profile.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.put("/", authMiddleware, saveProfile);

module.exports = router;
