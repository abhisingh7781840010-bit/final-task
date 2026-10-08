const careers=require("../data/careers");

const getCareers=(req,res)=>{
    res.json(
        careers.map(career=>({
            career:career.career,
            description:career.description
        }))
    );
};

const getCareer=(req,res)=>{
    const career=careers.find(
        item=>item.career.toLowerCase()===
        req.params.career_name.toLowerCase()
    );

    if(!career){
        return res.status(404).json({
            message:"Career not found"
        });
    }

    res.json(career);
};

module.exports={
    getCareers,
    getCareer
};