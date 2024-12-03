const mongoose = require("mongoose")

const OrdersSchema = mongoose.Schema({
  
    email : String,
    order_data : {
        type: Array , 
        required : true
    },
    order_date : {
        default : Date.now(),
        type : Date,
        required : false,
    } 
})

module.exports = mongoose.model("order",OrdersSchema)