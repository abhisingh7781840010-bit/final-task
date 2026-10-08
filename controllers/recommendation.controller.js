const {
    recommendCareers
}=require("../services/recommendation.service");

const recommend=(req,res)=>{
    try{
        const results=recommendCareers(
            req.body.skills,
            req.body.predicted_career
        );

        res.json({
            recommendations:results
        });
    }catch(error){
        res.status(400).json({
            message:error.message
        });
    }
};

module.exports={recommend};