const predictionRequestSchema={
    experience_years:"number >= 0",
    skills:"object containing 32 binary skill features"
};

const predictionResponseSchema={
    career:"string",
    confidence:"number between 0 and 1"
};

module.exports={
    predictionRequestSchema,
    predictionResponseSchema
};