const User= require("../models/User")
const jwt = require("jsonwebtoken")

//Gen JWT token
const genToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h"});
}

//Reg User
exports.regUser = async(req,res)=>{
    const {fName, email, pwd, proPicURL}=req.body;
    //check for missing fields
    if (!fName || !email || !pwd) {return res.status(400).json({message:"All fields are required"})};
    try{
        //check repeat email.
        const extUser= await User.findOne({email});
        if (extUser) {
            return res.status(400).json({message: "Email already registered"});
        }
        //create the user
        const user=await User.create({
            fName, email,pwd,proPicURL,
        });
        res.status(201).json({
            id:user._id,
            token: genToken(user._id),
        })
    } catch (err){
        res.status(500).json({message: "Error registering user",error:err.message});
    }
};

//Login USer
exports.loginUser = async(req,res)=>{
    const {email, pwd}= req.body;
    if (!email || !pwd) {return res.status(400).json({message:"All fields are required"})};
    try{
        const user=await User.findOne({email});
        if (!user|| !(await user.comparePwd(pwd))) {return res.status(400)
            .json({message:"Not registered or Wrong password"})}
        res.status(200).json({id:user._id, user, token:genToken(user._id)});
    } catch(err){
        res.status(500).json({message: "Error Login user",error:err.message});
    }
};

//Get User info
exports.getUserInfo = async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-pwd");
        if (!user){
            return res.status(404).json({message: "User Not Found"});
        }
        res.status(200).json(user);

    } catch(err){
        res.status(500).json({message: "Error Get Data",error:err.message});
    }
};