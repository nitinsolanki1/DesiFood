const express = require("express")
const router = express.Router()
const fooddatas = require("../model/FoodData")
const user = require("../model/user")
const FoodCategory = require("../model/FoodCategory")


router.post("/display" , async(req,res)=>{
   const fdata =  await fooddatas.find({})
   const FoodCategorys =  await FoodCategory.find({})
    res.send({success : true , data :  [ fdata , FoodCategorys ] })
})

module.exports = router 