const axios = require("axios");

const ML_API_URL = process.env.ML_API_URL;

const getMLBaseURL = () => {
  if (!ML_API_URL) {
    throw new Error("ML_API_URL environment variable is not configured");
  }

  return ML_API_URL.replace(/\/+$/, "");
};

const callML = async (endpoint, payload = {}) => {
  const baseURL = getMLBaseURL();

  const url = `${baseURL}${endpoint}`;

  console.log("ML API REQUEST");
  console.log("URL:", url);
  console.log("Payload:", JSON.stringify(payload));

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 60000,
    });

    console.log("ML API RESPONSE");
    console.log("Status:", response.status);
    console.log("Data:", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.error("ML API REQUEST FAILED");
    console.error("URL:", url);
    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);
    console.error("Message:", error.message);

    throw error;
  }
};


const checkMLHealth = async () => {
  const baseURL = getMLBaseURL();

  const url = `${baseURL}/`;  //`${baseURL}/health`   -> `${baseURL}/'

  try {
    const response = await axios.get(url, {
      timeout: 15000,
    });

    return response.data;
  } catch (error) {
    console.error("ML health check failed:", {
      url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    throw error;
  }
};


const predictCareer = async (payload) => {
  return callML("/predict", payload);
};

const predictCluster = async (payload) => {
  return callML("/cluster", payload);
};

const calculateSkillGap = async (payload) => {
  return callML("/skill-gap", payload);
};

module.exports = {
  callML,
  checkMLHealth,
  predictCareer,
  predictCluster,
  calculateSkillGap,
};