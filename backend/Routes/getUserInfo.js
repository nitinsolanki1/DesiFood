const express = require("express")
const router = express.Router()
const user  = require("../model/user")
const orderModel = require("../model/orders")
router.post("/getUserInfo" ,async (req,res) => {
    let email = req.body.email
    const userData = await user.findOne({email})
    if(!userData){

        res.send({success : false,user : null  , message : "cant find user"})
    }else{
        res.send({success : true,user : userData  , message : "user Found"})

    }
})
router.post("/deletUser" ,async (req,res) => {
    let userEmail = req.body.email
    const userData = await user.findOne({email : userEmail})

    if(userData){
        const deletedUser = await user.deleteOne({email : userEmail})
        await orderModel.deleteOne({email : userEmail})

        res.send({success : true,user : deletedUser  , message : "userDelete Success fully"})
    }else{
        res.send({success : false,user : null  , message : "cant find user"})

    }
})

module.exports = router