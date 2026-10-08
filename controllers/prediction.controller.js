const Student=require("../models/Student");
const {predictCareer}=require("../services/ml.service");

const predict=async(req,res)=>{
    try{
        const result=await predictCareer(req.body);

        res.json({
            career:result.career,
            confidence:result.confidence
        });
    }catch(error){
        res.status(500).json({
            message:"Career prediction failed",
            error:error.message
        });
    }
};

module.exports={predict};