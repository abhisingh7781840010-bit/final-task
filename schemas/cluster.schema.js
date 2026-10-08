const clusterRequestSchema={
    skills:"object containing 32 binary skill features"
};

const clusterResponseSchema={
    cluster:"number",
    cluster_name:"string"
};

module.exports={
    clusterRequestSchema,
    clusterResponseSchema
};