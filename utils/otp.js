const generateOTP=()=>{
    return Math.floor(100000+Math.random()*900000).toString();
};

const getOTPExpiry=()=>{
    const minutes=Number(process.env.OTP_EXPIRY_MINUTES)||10;
    return new Date(Date.now()+minutes*60*1000);
};

module.exports={
    generateOTP,
    getOTPExpiry
};