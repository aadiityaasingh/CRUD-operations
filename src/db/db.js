const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log("database connected");
    })
    .catch((err) => {
        console.log("there is mongo error", err);
    })
}
module.exports =connectDB;