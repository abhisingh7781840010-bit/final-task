const recommendationRequestSchema={
    skills:"array of strings",
    predicted_career:"string"
};

const recommendationResponseSchema={
    recommendations:[
        {
            career:"string",
            score:"number between 0 and 1"
        }
    ]
};

module.exports={
    recommendationRequestSchema,
    recommendationResponseSchema
};