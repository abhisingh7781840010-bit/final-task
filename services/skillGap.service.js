const careers=require("../data/careers");

const getSkillGap=(careerName,currentSkills)=>{
    const career=careers.find(
        item=>item.career.toLowerCase()===careerName.toLowerCase()
    );

    if(!career){
        throw new Error("Career not found");
    }

    const required=career.required_skills;

    const current=required.filter(
        skill=>currentSkills.some(
            currentSkill=>currentSkill.toLowerCase()===skill.toLowerCase()
        )
    );

    const missing=required.filter(
        skill=>!currentSkills.some(
            currentSkill=>currentSkill.toLowerCase()===skill.toLowerCase()
        )
    );

    return{
        career:career.career,
        current_skills:current,
        missing_skills:missing
    };
};

module.exports={getSkillGap};