const { type } = require("@testing-library/user-event/dist/type")
const mongoose = require("mongoose")


const userSchama = mongoose.Schema({
    name : String,
    age : Number,
    email : String,
    password : String,
    Location : String,
    cart : {
        type : Array,
        default : []
    },
    isAdmin : {
        type : Boolean,
        default :false
    },
    Date : {
        default : Date.now(),
        type : Date
    }
})

module.exports = mongoose.model("user",userSchama)

