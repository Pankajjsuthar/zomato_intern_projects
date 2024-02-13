const mongoose = require("mongoose");

const userSchema = {
    userName: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    images: {
        type: [String] // Array of strings
    }
}

const User = mongoose.model("User", userSchema);

module.exports = { User };
