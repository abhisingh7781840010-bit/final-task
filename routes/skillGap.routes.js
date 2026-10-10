const express=require("express");

const router=express.Router();

const {
    skillGap
}=require("../controllers/skillGap.controller");

router.post("/", skillGap);

module.exports=router;