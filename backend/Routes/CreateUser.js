const express = require("express")
const router = express.Router()
const user = require("../model/user")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken")
const secret = "huahkahkhsjkhdka"

    
router.post("/createuser" , async(req,res)=>{
            try {
              let a =   await user.findOne({email : req.body.email})
              if(a){
                  console.log("user allready exist",a.email)
                 res.send({success : false,message:"user allready exist"})
              }else{
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        bcrypt.hash(req.body.password, salt, async function(err, hash) {     
                            const createdUser = await user.create({
                                name : req.body.name ,
                                email : req.body.email , 
                                age : req.body.age , 
                                password : hash,
                                Location : req.body.Location
                            }
                            )

                    jwt.sign({  users: {
                            id : createdUser._id
                        }
                    }, secret, 
                    { expiresIn: '30' },
                    function(err, token) {
                        console.log(req.body.Location)
                        res.send({success : true,user:createdUser ,location : req.location ,token : token})
                    });
        
                });
            });
            
        }
           
        } catch (error) {

            console.log(error)
            res.send({success : false})
    
        }
    })

    
router.post("/createuser" , async(req,res)=>{
      let a =   await user.findOne({email : req.body.email})
      if(a){
         res.send({success : false,message:"user allready exist"})
      }else{
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(req.body.password, salt, async function(err, hash) {     
                    const createdUser = await user.create({
                        name : req.body.name ,
                        email : req.body.email , 
                        age : req.body.age , 
                        password : hash,
                        Location : req.body.Location
                    })
            jwt.sign({  users: {  id : createdUser._id}
            }, secret,{ expiresIn: '30' },
            (err, token) => res.send({success : true,user:createdUser ,location : req.location ,token : token}) );
 })})}})

module.exports = router