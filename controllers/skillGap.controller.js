// const {getSkillGap}=require("../services/skillGap.service");

// const skillGap=(req,res)=>{
//     try{
//         const result=getSkillGap(
//             req.body.career,
//             req.body.skills
//         );

//         res.json(result);
//     }catch(error){
//         res.status(400).json({
//             message:error.message
//         });
//     }
// };

// module.exports={skillGap};


const {
  predictCareer,
  calculateSkillGap,
} = require("../services/ml.service");

const analyzeSkillGap = async (req, res) => {
  try {
    const { skills } = req.body;

    if (
      !skills ||
      typeof skills !== "object" ||
      Array.isArray(skills)
    ) {
      return res.status(400).json({
        message: "skills must be an object",
      });
    }

    // Step 1: Predict career
    const prediction = await predictCareer({ skills });

    if (!prediction || !prediction.career) {
      return res.status(502).json({
        message: "Career prediction did not return a career",
      });
    }

    // Step 2: Calculate skill gap for predicted career
    const result = await calculateSkillGap({
      career: prediction.career,
      skills,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(
      "Skill Gap Error:",
      error.response?.data || error.stack || error.message
    );

    return res.status(500).json({
      message: "Skill gap analysis failed",
      detail:
        error.response?.data?.detail ||
        error.message ||
        "Unknown error",
    });
  }
};

module.exports = { analyzeSkillGap };





// const {
//   predictCareer,
//   calculateSkillGap,
// } = require("../services/ml.service");

// const analyzeSkillGap = async (req, res) => {
//   try {
//     const { skills } = req.body;

//     // Validate the skills object
//     if (
//       !skills ||
//       typeof skills !== "object" ||
//       Array.isArray(skills)
//     ) {
//       return res.status(400).json({
//         message: "skills must be an object containing the student's skills",
//       });
//     }

//     // Step 1: Predict career using the 32 skill columns
//     const prediction = await predictCareer({ skills });

//     if (!prediction || !prediction.career) {
//       return res.status(502).json({
//         message: "Career prediction did not return a career",
//       });
//     }

//     const predictedCareer = prediction.career;

//     // Step 2: Pass predicted career + same 32 skills to skill-gap API
//     const result = await calculateSkillGap({
//       career: predictedCareer,
//       skills,
//     });

//     // Step 3: Return both prediction and skill-gap analysis
//     return res.status(200).json({
//       predicted_career: predictedCareer,
//       confidence: prediction.confidence,
//       skill_gap: result,
//     });
//   } catch (error) {
//     console.error(
//       "Skill Gap Error:",
//       error.response?.data || error.message
//     );

//     return res.status(error.response?.status === 422 ? 422 : 502).json({
//       message: "Skill gap analysis failed",
//       detail:
//         error.response?.data?.detail ||
//         error.response?.data?.message ||
//         error.message ||
//         "Unknown error",
//     });
//   }
// };

// module.exports = { analyzeSkillGap };
