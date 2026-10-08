const axios=require("axios");

const ML_SERVICE_URL=process.env.ML_SERVICE_URL;

const predictCareer=async(data)=>{
    const response=await axios.post(
        `${ML_SERVICE_URL}/predict-career`,
        data
    );

    return response.data;
};

const predictCluster=async(data)=>{
    const response=await axios.post(
        `${ML_SERVICE_URL}/cluster-student`,
        data
    );

    return response.data;
};

module.exports={
    predictCareer,
    predictCluster
};