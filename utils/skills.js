const SKILLS=[
    "python",
    "java",
    "c_cpp",
    "javascript",
    "typescript",
    "html_css",
    "react",
    "angular_vue",
    "nodejs",
    "fastapi_flask",
    "django",
    "sql",
    "nosql",
    "mongodb",
    "postgresql",
    "pandas_numpy",
    "scikit_learn",
    "deep_learning",
    "pytorch_tensorflow",
    "nlp",
    "computer_vision",
    "docker",
    "kubernetes",
    "git",
    "linux",
    "aws",
    "azure_gcp",
    "ci_cd",
    "terraform",
    "cybersecurity_basics",
    "penetration_testing",
    "flutter_react_native"
];

const validateSkills=(skills)=>{
    for(const skill of SKILLS){
        if(skills[skill]===undefined){
            skills[skill]=0;
        }

        if(skills[skill]!==0&&skills[skill]!==1){
            throw new Error(`${skill} must be 0 or 1`);
        }
    }

    return skills;
};

module.exports={
    SKILLS,
    validateSkills
};