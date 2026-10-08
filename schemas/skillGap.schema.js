const skillGapRequestSchema={
    career:"string",
    skills:"array of strings"
};

const skillGapResponseSchema={
    career:"string",
    current_skills:"array of strings",
    missing_skills:"array of strings"
};

module.exports={
    skillGapRequestSchema,
    skillGapResponseSchema
};