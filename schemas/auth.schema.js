const signupSchema={
    name:"string",
    email:"valid email containing @",
    password:"8-20 characters with letters and numbers",
    education:"string",
    degree:"string"
};

const loginSchema={
    email:"valid email containing @",
    password:"string"
};

const verifyOtpSchema={
    email:"valid email",
    otp:"6 digit string"
};

const resendOtpSchema={
    email:"valid email"
};

const forgotPasswordSchema={
    email:"valid email"
};

const resetPasswordSchema={
    email:"valid email",
    otp:"6 digit string",
    newPassword:"8-20 characters with letters and numbers"
};

module.exports={
    signupSchema,
    loginSchema,
    verifyOtpSchema,
    resendOtpSchema,
    forgotPasswordSchema,
    resetPasswordSchema
};