const express=require("express");

const router=express.Router();

const {
    getCareers,
    getCareer
}=require("../controllers/career.controller");

router.get("/",getCareers);

router.get("/:career_name",getCareer);

module.exports=router;