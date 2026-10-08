const express=require("express");

const router=express.Router();

const {
    signup,
    verifySignupOTP,
    resendOTP,
    login,
    forgotPassword,
    resetPassword
}=require("../controllers/auth.controller");

router.post("/signup",signup);

router.post("/verify-otp",verifySignupOTP);

router.post("/resend-otp",resendOTP);

router.post("/login",login);

router.post("/forgot-password",forgotPassword);

router.post("/reset-password",resetPassword);

module.exports=router;