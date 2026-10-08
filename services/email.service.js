const nodemailer=require("nodemailer");

const transporter=nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:Number(process.env.EMAIL_PORT)||587,
    secure:false,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }
});

const sendOTPEmail=async(email,otp,type)=>{
    let subject="AI Career Platform OTP";
    let message=`Your OTP is ${otp}. It is valid for ${process.env.OTP_EXPIRY_MINUTES||10} minutes.`;

    if(type==="signup"){
        subject="Verify your AI Career Platform account";
    }

    if(type==="reset"){
        subject="Reset your AI Career Platform password";
    }

    await transporter.sendMail({
        from:process.env.EMAIL_FROM,
        to:email,
        subject,
        text:message,
        html:`
            <div>
                <h2>AI Career & Skill Intelligence Platform</h2>
                <p>Your OTP is:</p>
                <h1>${otp}</h1>
                <p>This OTP is valid for ${process.env.OTP_EXPIRY_MINUTES||10} minutes.</p>
                <p>Do not share this OTP with anyone.</p>
            </div>
        `
    });
};

module.exports={
    sendOTPEmail
};