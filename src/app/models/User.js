const mongoose = require("mongoose");

const user = mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, required: true},
    password: {
        type: String,
        required: true,
        select:false,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("user", user);