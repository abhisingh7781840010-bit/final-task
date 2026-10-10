const express=require("express");

const router=express.Router();

const {
    analyzeSkillGap
}=require("../controllers/skillGap.controller");

router.post("/",analyzeSkillGap);
//skillGap
module.exports=router;