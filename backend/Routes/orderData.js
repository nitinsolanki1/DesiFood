const express = require("express")
const router = express.Router()
const order = require("../model/orders")

router.post("/order" , async(req,res)=>{
        let data = req.body.order_data
        console.log(req.body.email)
        let eid = await order.findOne({email : req.body.email})
        // console.log(eid)
        if(eid === null) {
            try{
                await order.create({
                    email : req.body.email,
                    order_data : [data]
                }).then(()=>{
                        
                        res.send({success : true })
                })
            }catch(err){
                console.log(err.message)
            }
        }
        else{
            try {
                await order.findOneAndUpdate ({email : req.body.email},{$push : {order_data : data}})
                .then(()=>res.json({success : true}))
            } catch (error) {
                
            }
        }
})


router.post("/myorder" , async(req,res)=>{
    let user = await order.findOne({email : req.body.email})
    if(user){

        res.send({success : true , order_data :  user.order_data})
    }else{
        res.send({success : true , order_data :  []})

    }   
})


module.exports = router