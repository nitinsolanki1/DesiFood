const express = require("express")
const router = express.Router()
const user = require("../model/user")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const secret = "huahkahkhsjkhdka"


router.post("/loginuser" , async(req,res)=>{
        try {
   
            const cuser = await user.findOne({email : req.body.email})
            if(!cuser) {
                res.send({success : false , msg : "user not found"})
                console.error("username or password are wrong")
            }else{
                console.log(req.url)


                
                bcrypt.compare(req.body.password, cuser.password, function(err, result) {
                    if(result){
                            jwt.sign({
                                user: {
                                    id : cuser._id
                                }
                            }, 
                            secret, 
                            { expiresIn: '30' },
                            function(err, token) {
                                res.send({success : true , token : token})
                            });

                        //   console.log()

                 }else{

                     console.error("username or password are wrong")
                     res.send({success : false})

                    }

                });


                                  


            }
            
        } catch (error) {

             console.log(error)
            res.send({success : false})
    
        }
    })


    
// router.post("/loginuser" , async(req,res)=>{
//         const cuser = await user.findOne({email : req.body.email})
//         if(!cuser) {
//             res.send({success : false , msg : "user not found"})
//         }else{
//             bcrypt.compare(req.body.password, cuser.password, function(err, result) {
//                 if(result){
//                      jwt.sign({user: {id : cuser._id}}, 
//                             secret, 
//                             { expiresIn: '30' },
//                          (err, token) =>  res.send({success : true , token : token}));
//              }else{  res.send({success : false}) }
// })}})


router.post("/adminLogin" , async(req,res)=>{
        try {
   
            const cuser = await user.findOne({email : req.body.email})
          
            if(!cuser) {
                res.send({success : false , msg : "admin not found"})
                console.error("username or password are wrong")
            }else{
                console.log(req.url)

                if(cuser.isAdmin){
                
                
                // bcrypt.compare(req.body.password, cuser.password, function(err, result) {
                    // if(result)
                    if(cuser.password === req.body.password){
                            jwt.sign({
                                user: {
                                    id : cuser._id
                                }
                            }, 
                            secret, 
                            { expiresIn: '30' },
                            function(err, token) {
                                res.send({success : true , token : token})
                            });
                            res.send({success:true,msg:"admin login succeefulyy done"})

                        }else{
                                 console.error("username or password are wrong")
                                 res.send({success : false, msg : "password not match"})

                         }

                // });


                }else{
                     res.send({success : false, msg : "user is not admin"})

                }                     


            }
            
        } catch (error) {

             console.log(error)
            res.send({success : false, msg : "error in code"})
    
        }
    })

module.exports = router