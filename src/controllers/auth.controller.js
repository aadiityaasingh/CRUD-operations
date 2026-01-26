const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailVerify = require("../services/email.service.js");

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isAlreadyExists = await userModel.findOne({ email });
    if (isAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      emailOtp,
      emailOtpExpiry: Date.now() + 10 * 60 * 1000,
    });

    try {
      await emailVerify.sendOtpEmail(user.email, emailOtp);
    } catch (emailError) {
      await userModel.deleteOne({ _id: user._id });
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    res.status(201).json({
      message: "OTP sent to email. Please verify your account.",
    });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
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