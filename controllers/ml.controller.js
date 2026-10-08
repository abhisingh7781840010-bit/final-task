const {
  callML,
  checkMLHealth,
} = require("../services/ml.service");


const forwardToML = (endpoint) => async (req, res) => {
  try {
    const result = await callML(endpoint, req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    console.error("ML API error:", {
      endpoint,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    let statusCode = 503;

    if (error.code === "ECONNABORTED") {
      statusCode = 504;
    } else if (error.response?.status) {
      statusCode = error.response.status;
    }

    return res.status(statusCode).json({
      success: false,
      message: "ML request failed",
      endpoint,
      error:
        error.response?.data ||
        error.message,
    });
  }
};


const mlHealth = async (req, res) => {
  try {

    const result = await checkMLHealth();

    return res.status(200).json({
      success: true,
      mlService: "connected",
      data: result,
    });

  } catch (error) {

    console.error("ML health check failed:", error.message);

    return res.status(503).json({
      success: false,
      mlService: "unavailable",
      message: error.message,
    });
  }
};


module.exports = {

  // Node -> Python
  predictCareer: forwardToML("/predict"),

  // Node -> Python
  clusterStudent: forwardToML("/cluster"),

  // Node -> Python
  calculateSkillGap: forwardToML("/skill-gap"),

  // Node -> Python
  mlHealth,

};