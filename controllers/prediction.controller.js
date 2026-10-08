
const { predictWithML } = require("../services/ml.service");

const predictCareer = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload || typeof payload !== "object" ||
        Array.isArray(payload) || Object.keys(payload).length === 0) {
      return res.status(400).json({
        message: "A valid JSON prediction payload is required",
      });
    }

    const prediction = await predictWithML(payload);

    return res.status(200).json({
      message: "Career prediction successful",
      prediction,
    });
  } catch (error) {
    console.error("ML prediction failed:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    const status = error.response?.status === 404 ? 502 : 500;

    return res.status(status).json({
      message: "Career prediction failed",
      error:
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message,
    });
  }
};

module.exports = { predictCareer };