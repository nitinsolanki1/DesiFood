const express = require("express")
const router = express.Router()
const user = require("../model/user")
const order = require("../model/orders")

router.post("/addToCart" , async(req,res)=>{
    let data =  await req.body.cartData;
    console.log(data)

         let cuser = await user.findOneAndUpdate({email : req.body.email} , {$push : { cart : data}})
        
        
        
               res.json({success : true , cuser })
})


router.post("/getCartData" , async(req,res)=>{

    let cuser = await user.findOne({email : req.body.email})
    // console.log(cuser)
    if(cuser.cart == []) {
        res.json({success : true,cart : []   })
    }else{

        res.json({success : true,cart : cuser.cart   })
    }
})




       

    
       





router.post("/checkOutCart" ,async (req,res)=>{
    
    let cuser =  await user.findOne({email : req.body.email})
    console.log(cuser)
    let userOrder =  await order.findOneAndUpdate({email : req.body.email},{$push : {order_data : cuser.cart}} )
    let user2 =  await order.findOne({email : req.body.email})
    await user.findOneAndUpdate({email : req.body.email} , {$set : {cart : []}} )

    res.send({success: true , data : user2.order_data})
    
 })
module.exports = router