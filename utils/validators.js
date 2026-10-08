const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail=(email)=>{
    return emailRegex.test(email);
};

const validatePassword=(password)=>{
    if(typeof password!=="string"){
        return false;
    }

    if(password.length<8||password.length>20){
        return false;
    }

    if(!/[A-Za-z]/.test(password)){
        return false;
    }

    if(!/[0-9]/.test(password)){
        return false;
    }

    return true;
};

module.exports={
    validateEmail,
    validatePassword
};