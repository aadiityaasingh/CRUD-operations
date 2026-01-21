const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route.js");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("this is working");
})

app.use("/api/auth", authRoutes);

module.exports = app;