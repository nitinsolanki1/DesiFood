const express = require("express")
const router = express.Router()
const fooddatas = require("../model/FoodData")
const userModel = require("../model/user") 
const orderModel = require("../model/orders") 

router.post("/admin/additem" , async (req,res)=>{
    try{
        const { CategoryName , name , img  , options , descriptionate} = req.body;
       
        if( !(CategoryName && name  && img && options && descriptionate)){
            return res.json({success : false,msg : "please provided all value" })
        }

        const itemExist = await fooddatas.exists({name : name})

        if(itemExist){
            const allItems = await fooddatas.find({})


            console.log("item exist")

            res.json({success : false ,msg : "there is allready item with provided name please change the name" ,allItems})

        }else{
            
            console.log("item not exist")
            const cur = await fooddatas.create({ CategoryName , name , img  , options , descriptionate  })
            
            const allItems = await fooddatas.find({})
            res.json({success : true,msg : "data added "  ,CategoryName, cur:null , deletedItem : null , allItems})

        }
        
    }catch(e){
            console.log(e)
            res.json({msg:"error ocuure" , error : e.message})
        
    }

})


router.delete("/admin/deletItem/:name" , async (req,res)=>{
    
    try{
        const id = req.body.id;
        const name = req.params.name;
       
        if( !(name || id)){
            return res.json({success : false,msg : "please provided any  value" })
        }

        const itemExist = await fooddatas.exists({$or  :[ {name } , {_id : id} ]})

        if(itemExist){
            
            console.log("item exist")
            
            const deletedItem = await fooddatas.deleteOne({$or  :[ {name } , {_id : id} ]})
            res.json({success : true,msg : "item removed "  , deletedItem })
            
        }else{
            
            console.log("item not exist")
            res.json({success : false ,msg : "there is no provided item" })
           

        }
        
    }catch(e){
            console.log(e)
        
    }

  
})



router.get("/admin/getByID/:id" , async (req,res)=>{
    
    try{
        // const id = req.body.id;
        const id = req.params.id;
       
        if(!id){
            return res.json({success : false,msg : "item id is not found" })
        }

        const itemExist = await fooddatas.findById(id)
        console.log(itemExist)
        if(itemExist){

        }
        res.json({success:true,product : itemExist})

        // if(itemExist){
            
        //     console.log("item exist")
            
        //     const deletedItem = await fooddatas.deleteOne({$or  :[ {name } , {_id : id} ]})
        //     res.json({success : true,msg : "item removed "  , deletedItem })
            
        // }else{
            
        //     console.log("item not exist")
        //     res.json({success : false ,msg : "there is no provided item" })
           

        // }
        
    }catch(e){
            console.log(e)
        
    }

  
})



router.put("/admin/updateitem/:id" , async (req,res)=>{
    
    try{
        const id = req.params.id;
        const {name,img,description,CategoryName} = req.body
       const NewData = {}
        if(!id){

            return res.json({success : false,msg : "item id is not found" })
        }

        const itemExist = await fooddatas.findById(id)
        // console.log(itemExist)
        // if(itemExist){
            // itemExist = {
            //     ...itemExist,
            //     name,img,description,CategoryName

            // }
            // "CategoryName": "Biryani/Rice",
            // "name": "Chicken Fried Rice",
            // "img": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMGZyaWVkJTIwcmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            // "options": [
            //   {
            //     "half": "130",
            //     "full": "220"
            //   }
            // ],
            // "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
         const newitem =   await fooddatas.updateOne({_id : id},{name,img,description,CategoryName})
            res.json({success:true,itemExist , newitem})

        // }

      
        
    }catch(e){
            console.log(e)
        
    }

  
})


router.get("/getallProducts" , async (req,res)=>{
    
    try{
        
            let all = await fooddatas.find({})
            res.json({success : true  ,msg : "here are total ptoducts" , products : all }) 
        
    }catch(e){
        res.json({success : false  ,msg : "there is some error" , error : e.name })
        
        console.log(e)
        
    }  
})


router.get("/getTotalOrder" , async (req,res)=>{
    
    try{
        
            let all = await orderModel.find({})
           let result =  all.map((ele,ind)=>{
                return {
                    email : ele.email,
                    totalOrder : ele.order_data.length
                }

            })
            res.json({success : true  ,msg : "here are total ptoducts",FilterdResult : result ,allOrders : all}) 
        
    }catch(e){
        res.json({success : false  ,msg : "there is some error" , error : e.name })
        
        console.log(e)
        
    }  
})



router.get("/getTotalAccount" , async (req,res)=>{
    
    try{
        
            let all = await userModel.find({})
          

            res.json({success : true  ,msg : "here are total ptoducts",result  : all}) 
        
    }catch(e){
        res.json({success : false  ,msg : "there is some error" , error : e.name })
        
        
    }  
})




router.get("/getTotal" , async (req,res)=>{
    
    try{
        
            let result1 = await userModel.find({})
            let result2 = await orderModel.find({})

            let final = result1.map((ele,ind)=>{

                  let dataToMErge = result2.filter((e)=>{
                     return e.email == ele.email
                  }) 

                 ele ={
                    ...ele._doc  ,
                    orders : dataToMErge[0].order_data 
                 }
                  return ele
                //   return   {...ele,orders : dataToMErge[0].order_data}
                 
            })

            res.json({success : true  ,msg : "here are total result",Result : final}) 
        
    }catch(e){
        res.json({success : false  ,msg : "there is some error" , error : e.name })
        
        console.log(e)
        
    }  
})

module.exports = router