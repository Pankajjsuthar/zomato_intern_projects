const mongoose = require("mongoose")

const db = "mongodb+srv://pankajsuthar:system@cluster0.q5qr1t9.mongodb.net/";

const connectDB = async()=>{
    try{
        await mongoose.connect(db);
        console.log("MongoDB connected.");
    }
    catch{
        console.log("Failed to connect with MongoDB.");
    }
};

module.exports = connectDB;