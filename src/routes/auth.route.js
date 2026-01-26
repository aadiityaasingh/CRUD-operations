const express = require("express");
const authController = require("../controllers/auth.controller.js");
const otpController = require("../controllers/otp.controller.js")
const router = express.Router();

router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);

router.post("/verify-otp", otpController.verifyEmailOtp);

module.exports = router;