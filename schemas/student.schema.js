const {SKILLS}=require("../utils/skills");

const studentSchema={
    student_id:"string",
    name:"string",
    education:"string",
    degree:"string",
    experience_years:"number >= 0",
    skills:SKILLS,
    projects:"number >= 0",
    certifications:"array of strings",
    interests:"array of strings",
    soft_skills:"array of strings"
};

module.exports=studentSchema;