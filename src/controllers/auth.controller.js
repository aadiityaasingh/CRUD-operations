const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req,res){
    const {name, email, password} = req.body;
    const isAlreadyExists = await userModel.findOne({email})
    if(isAlreadyExists){
        return res.status(400).json({message: "user already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
        name,
        email,
        password: hashedPassword,
    })
    await user.save();

    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET);

    res.cookie("token", token)
    res.status(200).json({
        message: "user registered successfully",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        }
    })
}

async function loginUser(req,res){
    const {email, password} =req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token);
    res.status(200).json({
        message: "login successfully",
        user: {
            name: user.name,
            _id: user._id,
            email: user.email
        }
    })
}

async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "logout successfully"
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
}