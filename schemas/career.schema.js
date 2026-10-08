const careerResponseSchema={
    career:"string",
    description:"string"
};

const careerDetailsResponseSchema={
    career:"string",
    required_skills:"array of strings",
    description:"string"
};

module.exports={
    careerResponseSchema,
    careerDetailsResponseSchema
};