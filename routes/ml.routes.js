
const express = require("express");
const router = express.Router();

const {
  predictCareer,
  clusterStudent,
  calculateSkillGap,
  mlHealth,
} = require("../controllers/ml.controller");

router.post("/predict-career", predictCareer);
router.post("/cluster-student", clusterStudent);
router.post("/skill-gap", calculateSkillGap);
router.get("/ml-health", mlHealth);

module.exports = router;