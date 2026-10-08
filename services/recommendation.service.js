const careers=require("../data/careers");

const recommendCareers=(skills,predictedCareer)=>{
    const results=careers.map(career=>{
        let matched=0;

        for(const required of career.required_skills){
            const found=skills.some(
                skill=>skill.toLowerCase()===required.toLowerCase()
            );

            if(found){
                matched++;
            }
        }

        const score=
            career.required_skills.length===0
            ?0
            :matched/career.required_skills.length;

        return{
            career:career.career,
            score:Number(score.toFixed(2))
        };
    });

    results.sort((a,b)=>b.score-a.score);

    return results.slice(0,4);
};

module.exports={recommendCareers};