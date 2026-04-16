const express = require("express");
const {protect} = require("../middleware/authMiddleware");

const{
    regUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");

const router = express.Router();
router.post("/register",regUser);
router.post("/login",loginUser);
router.get("/getUser",protect,getUserInfo);
router.post("/getUser",protect,getUserInfo);


module.exports=router;