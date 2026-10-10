const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require("./config/db");

dotenv.config();

const app=express();

connectDB();
app.use(cors({
  origin: ["https://parakh4.vercel.app",
          "http://localhost:5173",
          "http://localhost:3000",
        ],

  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/api/auth",require("./routes/auth.routes"));
app.use("/api/student",require("./routes/student.routes"));
app.use("/api/predict-career",require("./routes/prediction.routes"));
app.use("/api/skill-gap",require("./routes/skillGap.routes"));
app.use("/api/cluster-student",require("./routes/cluster.routes"));
app.use("/api/career",require("./routes/career.routes"));
app.use("/api/recommend-careers",require("./routes/recommendation.routes"));
app.use("/api", require("./routes/ml.routes"));

app.get("/",(req,res)=>{
    res.json({
        message:"AI Career & Skill Intelligence API",
        status:"running"
    });
});

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).json({
        message:"Internal server error"
    });
});

const PORT=process.env.PORT||5000;

app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Server running on port ${PORT}`);
});