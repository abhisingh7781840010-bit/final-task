const express=require("express");

const router=express.Router();

const authMiddleware=require("../middleware/auth.middleware");

const {
    predict
}=require("../controllers/prediction.controller");

router.post(
    "/",
    authMiddleware,
    predict
);

module.exports=router;


// const express = require("express");

// const router = express.Router();

// const authMiddleware = require("../middleware/auth.middleware");

// router.post(
//     "/",
//     authMiddleware,
//     (req, res) => {
//         res.status(200).json({
//             message: "Authorization successful",
//             user: req.user
//         });
//     }
// );

// module.exports = router;