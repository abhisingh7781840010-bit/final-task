const {getSkillGap}=require("../services/skillGap.service");

const skillGap=(req,res)=>{
    try{
        const result=getSkillGap(
            req.body.career,
            req.body.skills
        );

        res.json(result);
    }catch(error){
        res.status(400).json({
            message:error.message
        });
    }
};

module.exports={skillGap};