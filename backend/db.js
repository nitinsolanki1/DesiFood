const mongoose = require("mongoose")


const mongodb = async ()=>{
    mongoose.connect("mongodb://localhost:27017/DesiFood",{
        useNewUrlParser : true , 
        useUnifiedTopology : true
    }).then(()=>{

        console.log("connected")
    }).catch((erro)=>{
        console.log(erro)
    })
   

}
module.exports = mongodb()