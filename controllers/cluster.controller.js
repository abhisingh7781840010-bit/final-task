const {predictCluster}=require("../services/ml.service");

const cluster=async(req,res)=>{
    try{
        const result=await predictCluster(req.body);

        res.json({
            cluster:result.cluster,
            cluster_name:result.cluster_name
        });
    }catch(error){
        res.status(500).json({
            message:"Clustering failed",
            error:error.message
        });
    }
};

module.exports={cluster};