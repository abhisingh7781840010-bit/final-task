const mongoose=require("mongoose");

const studentSchema=new mongoose.Schema({
    student_id:{
        type:String,
        required:true,
        unique:true
    },

    name:{
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

    experience_years:{
        type:Number,
        required:true,
        min:0
    },

    skills:{
        type:Object,
        required:true
    },

    projects:{
        type:Number,
        default:0,
        min:0
    },

    certifications:{
        type:[String],
        default:[]
    },

    interests:{
        type:[String],
        default:[]
    },

    soft_skills:{
        type:[String],
        default:[]
    },

    predicted_career:{
        type:String,
        default:null
    },

    confidence:{
        type:Number,
        default:null
    },

    cluster:{
        type:Number,
        default:null
    },

    cluster_name:{
        type:String,
        default:null
    },

    missing_skills:{
        type:[String],
        default:[]
    },

    recommendations:{
        type:Array,
        default:[]
    }

},{timestamps:true});

module.exports=mongoose.model("Student",studentSchema);