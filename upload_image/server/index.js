const bodyParser = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const connectDB = require("./config/db.js");
const PORT = 3000;
const mongoose = require("mongoose");
const cookie = require("cookie");
const axios = require("axios");
const { authenticatejwt } = require("./middleware/auth.js");
app.use(cors());
app.use(express.json());
const { User } = require("./models/User.jsx");
const { secretKey } = require("./middleware/auth.js");
const { isAsyncFunction } = require("util/types");

connectDB();

// Set storage engine using Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // File name
  },
});

// Initialize Multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB file size limit
}).single("file"); // 'file' is the name of the file input field in the form

// Route for file upload
app.put("/user/addImage", authenticatejwt, async(req,res)=>{
    try {
        const fileLink = req.file;
        const { emailId, password } = req.user;
        
        // Update the User document
        const updatedUser = await User.updateOne(
            { emailId, password },
            { $push: { images: fileLink } }
        );

        if (updatedUser.nModified > 0) {
            res.status(200).json({ message: 'Image added successfully' });
        } else {
            res.status(400).json({ message: 'Failed to add image' });
        }
    } catch (error) {
        console.error('Error adding image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/user/upload',async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error uploading file' });
      } else {
        if (req.file) { 
            // const token = req.token;
            // const response = await axios.put("http://localhost:3000/user/addImage",
            // req.file, {authorization : token});
          console.log('File uploaded successfully:', req.file);
          res.status(200).json({ message: 'File uploaded successfully' });
        } else {
          res.status(400).json({ message: 'No file uploaded' });
        }
      }
    });
  });
  
  // Serve static files
  app.use(express.static('public'));

app.post("/user/signup", (req, res) => {
  const { emailId, password, userName } = req.body;
  User.findOne({ emailId }).then((user) => {
    if (user) {
      console.log("user already exist");
      res.sendStatus(405).json({ message: "User already exists." });
    } else {
      const obj = {
        userName: userName,
        emailId: emailId,
        password: password,
        images: [],
      };
      const newUser = new User(obj);
      newUser.save();
      res.status(200).json({ message: "User created successfully." });
    }
  });
});

app.post("/user/login", async (req, res) => {
  const { emailId, password } = req.body;
  User.findOne({ emailId, password }).then((user) => {
    if (user) {
      const token = jwt.sign(
        { emailId: emailId, password: password },
        secretKey,
        { expiresIn: "1hr" }
      );
      res.status(200).json({ message: "User logged in successfully. ", token });
    } else {
      res.sendStatus(405).json({ message: "User didn't exists. " });
    }
  });
});

app.listen(3000, () => {
  console.log("Server started at port no. 3000.");
});
