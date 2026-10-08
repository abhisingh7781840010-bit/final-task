const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const User=require("../models/User");

const {
    validateEmail,
    validatePassword
}=require("../utils/validators");

const {
    generateOTP,
    getOTPExpiry
}=require("../utils/otp");

const {
    sendOTPEmail
}=require("../services/email.service");

const createToken=(user)=>{
    return jwt.sign(
        {
            userId:user._id,
            email:user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    );
};

const signup=async(req,res)=>{
    try{
        const {
            name,
            email,
            password,
            education,
            degree
        }=req.body;

        if(!name||!email||!password||!education||!degree){
            return res.status(400).json({
                message:"All required fields must be provided"
            });
        }

        if(!validateEmail(email)){
            return res.status(400).json({
                message:"Enter a valid email address containing @"
            });
        }

        if(!validatePassword(password)){
            return res.status(400).json({
                message:"Password must be 8-20 characters and contain at least one letter and one number"
            });
        }

        const normalizedEmail=email.toLowerCase().trim();

        const existingUser=await User.findOne({
            email:normalizedEmail
        });

        if(existingUser){
            return res.status(409).json({
                message:"Email already registered"
            });
        }

        const hashedPassword=await bcrypt.hash(password,12);

        const otp=generateOTP();

        const user=await User.create({
            name,
            email:normalizedEmail,
            password:hashedPassword,
            education,
            degree,
            isVerified:false,
            otp,
            otpExpires:getOTPExpiry(),
            otpPurpose:"signup"
        });

        await sendOTPEmail(
            normalizedEmail,
            otp,
            "signup"
        );

        res.status(201).json({
            message:"Account created. OTP sent to your email.",
            email:user.email
        });

    }catch(error){
        console.error(error);

        res.status(500).json({
            message:"Signup failed"
        });
    }
};

const verifySignupOTP=async(req,res)=>{
    try{
        const {email,otp}=req.body;

        if(!validateEmail(email)){
            return res.status(400).json({
                message:"Invalid email"
            });
        }

        const user=await User.findOne({
            email:email.toLowerCase().trim()
        });

        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }

        if(user.isVerified){
            return res.status(400).json({
                message:"Account already verified"
            });
        }

        if(
            user.otp!==otp||
            !user.otpExpires||
            user.otpExpires<new Date()
        ){
            return res.status(400).json({
                message:"Invalid or expired OTP"
            });
        }

        user.isVerified=true;
        user.otp=null;
        user.otpExpires=null;
        user.otpPurpose=null;

        await user.save();

        const token=createToken(user);

        res.json({
            message:"Email verified successfully",
            token
        });

    }catch(error){
        res.status(500).json({
            message:"OTP verification failed"
        });
    }
};

const resendOTP=async(req,res)=>{
    try{
        const {email}=req.body;

        if(!validateEmail(email)){
            return res.status(400).json({
                message:"Invalid email"
            });
        }

        const user=await User.findOne({
            email:email.toLowerCase().trim()
        });

        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }

        if(user.isVerified){
            return res.status(400).json({
                message:"Account already verified"
            });
        }

        const otp=generateOTP();

        user.otp=otp;
        user.otpExpires=getOTPExpiry();

        await user.save();

        await sendOTPEmail(
            user.email,
            otp,
            "signup"
        );

        res.json({
            message:"New OTP sent successfully"
        });

    }catch(error){
        res.status(500).json({
            message:"Unable to send OTP"
        });
    }
};

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!validateEmail(email)){
            return res.status(400).json({
                message:"Invalid email"
            });
        }

        if(!password){
            return res.status(400).json({
                message:"Password is required"
            });
        }

        const user=await User.findOne({
            email:email.toLowerCase().trim()
        });

        if(!user){
            return res.status(401).json({
                message:"Invalid email or password"
            });
        }

        if(!user.isVerified){
            return res.status(403).json({
                message:"Please verify your email before login"
            });
        }

        const passwordMatch=await bcrypt.compare(
            password,
            user.password
        );

        if(!passwordMatch){
            return res.status(401).json({
                message:"Invalid email or password"
            });
        }

        const token=createToken(user);

        res.json({
            message:"Login successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });

    }catch(error){
        res.status(500).json({
            message:"Login failed"
        });
    }
};

const forgotPassword=async(req,res)=>{
    try{
        const {email}=req.body;

        if(!validateEmail(email)){
            return res.status(400).json({
                message:"Invalid email"
            });
        }

        const user=await User.findOne({
            email:email.toLowerCase().trim()
        });

        if(!user){
            return res.status(404).json({
                message:"No account found with this email"
            });
        }

        const otp=generateOTP();

        user.otp=otp;
        user.otpExpires=getOTPExpiry();
        user.otpPurpose="reset";

        await user.save();

        await sendOTPEmail(
            user.email,
            otp,
            "reset"
        );

        res.json({
            message:"Password reset OTP sent to your email"
        });

    }catch(error){
        res.status(500).json({
            message:"Unable to send reset OTP"
        });
    }
};

const resetPassword=async(req,res)=>{
    try{
        const {
            email,
            otp,
            newPassword
        }=req.body;

        if(!validateEmail(email)){
            return res.status(400).json({
                message:"Invalid email"
            });
        }

        if(!validatePassword(newPassword)){
            return res.status(400).json({
                message:"Password must be 8-20 characters and contain at least one letter and one number"
            });
        }

        const user=await User.findOne({
            email:email.toLowerCase().trim()
        });

        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }

        if(
            user.otp!==otp||
            user.otpPurpose!=="reset"||
            !user.otpExpires||
            user.otpExpires<new Date()
        ){
            return res.status(400).json({
                message:"Invalid or expired OTP"
            });
        }

        user.password=await bcrypt.hash(
            newPassword,
            12
        );

        user.otp=null;
        user.otpExpires=null;
        user.otpPurpose=null;

        await user.save();

        res.json({
            message:"Password reset successfully"
        });

    }catch(error){
        res.status(500).json({
            message:"Password reset failed"
        });
    }
};

module.exports={
    signup,
    verifySignupOTP,
    resendOTP,
    login,
    forgotPassword,
    resetPassword
};