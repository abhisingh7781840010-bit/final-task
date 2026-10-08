const express=require("express");

const router=express.Router();

const {
    createStudent,
    getStudent
}=require("../controllers/student.controller");

router.post("/",createStudent);

router.get("/:student_id",getStudent);

module.exports=router;