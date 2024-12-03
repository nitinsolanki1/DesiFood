
const mongoose = require("mongoose")
// const mongoose2 = require("../.")

const foodDataSchama = mongoose.Schema({
    CategoryName: {
        type  : String,
        require : true
    },
    name :{
        type  : String,
        require : true
    },
    img: {
        type  : String,
        require : true
    },
    options : {
        type  : Array,
        require : true
    }, 
    descriptionate : {
        
        type : String
    },

})

module.exports = mongoose.model("fooddatas",foodDataSchama)