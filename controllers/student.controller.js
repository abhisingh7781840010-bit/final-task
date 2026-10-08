// const Student=require("../models/Student");
// const {validateSkills}=require("../utils/skills");

// const createStudent=async(req,res)=>{
//     try{
//         const data=req.body;

//         data.skills=validateSkills(data.skills);

//         const student=new Student(data);

//         await student.save();

//         res.status(201).json({
//             student_id:student.student_id,
//             message:"Student profile saved"
//         });
//     }catch(error){
//         res.status(400).json({
//             message:error.message
//         });
//     }
// };

// const getStudent=async(req,res)=>{
//     try{
//         const student=await Student.findOne({
//             student_id:req.params.student_id
//         });

//         if(!student){
//             return res.status(404).json({
//                 message:"Student not found"
//             });
//         }

//         res.json(student);
//     }catch(error){
//         res.status(500).json({
//             message:error.message
//         });
//     }
// };

// module.exports={
//     createStudent,
//     getStudent
// };


const Student=require("../models/Student");
const {validateSkills}=require("../utils/skills");

const createStudent=async(req,res)=>{
    try{
        const data=req.body;

        data.skills=validateSkills(data.skills);

        const existing=await Student.findOne({
            student_id:data.student_id
        });

        if(existing){
            return res.status(409).json({
                message:"Student already exists"
            });
        }

        const student=new Student(data);

        await student.save();

        res.status(201).json({
            student_id:student.student_id,
            message:"Student profile saved"
        });

    }catch(error){
        res.status(400).json({
            message:error.message
        });
    }
};

const getStudent=async(req,res)=>{
    try{
        const student=await Student.findOne({
            student_id:req.params.student_id
        });

        if(!student){
            return res.status(404).json({
                message:"Student not found"
            });
        }

        res.json(student);

    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

module.exports={
    createStudent,
    getStudent
};