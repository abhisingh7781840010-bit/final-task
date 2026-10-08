const express=require("express");

const router=express.Router();

const {
    cluster
}=require("../controllers/cluster.controller");

router.post("/",cluster);

module.exports=router;