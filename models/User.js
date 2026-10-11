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
    },
     branch: {
        type: String,
        default: ""
    },

    experience_years: {
        type: Number,
        default: 0
    },

    skills: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },

    interests: {
        type: [String],
        default: []
    },
     
},{timestamps:true});

module.exports=mongoose.model("User",userSchema);