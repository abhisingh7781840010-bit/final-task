const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },

    password:{
        type:String,
        required:true
    },

    education:{
        type:String,
        required:true
    },

    degree:{
        type:String,
        required:true
    },

    isVerified:{
        type:Boolean,
        default:false
    },

    otp:{
        type:String,
        default:null
    },

    otpExpires:{
        type:Date,
        default:null
    },

    otpPurpose:{
        type:String,
        default:null
    }

},{timestamps:true});

module.exports=mongoose.model("User",userSchema);