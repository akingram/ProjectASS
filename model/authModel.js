const mongoose = require("mongoose")


const authSchema =  new mongoose.Schema({
    Username : {
        type: String,
        required : true,
    },

    Email:{
        type: String,
        required : true,
        unique: true,
    },
    password: {
        type : String,
        required : true,
    },

    // retypepassword:{
    //     type:String,
    //     required : true,
    // },
    createAt:{
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("auth",authSchema)