
const User = require("../models/User");

const saveProfile = async (req, res) => {
    try {
        const { branch, experience_years, skills, interests } = req.body;

        const userId = req.user.id || req.user.userId;

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    "profile.branch": branch ?? "",
                    "profile.experience_years": experience_years ?? 0,
                    "profile.skills": skills ?? {},
                    "profile.interests": interests ?? []
                }
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password -otp -otpExpires");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Profile saved successfully",
            user
        });
    } catch (error) {
        console.error("Profile save error:", error.message);

        return res.status(500).json({
            message: "Failed to save profile"
        });
    }
};

module.exports = { saveProfile };

