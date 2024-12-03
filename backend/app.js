const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const PORT = 5000
// const fooddatas = require("./model/FoodData")
const mongodb = require("./db")
const cors = require('cors');



app.use(cors());
app.use(bodyparser.json())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.get("/",async(req,res)=>{

    res.json({success:true,msg:"all is ok"})
})
app.use("/api",require("./Routes/CreateUser"))
app.use("/api",require("./Routes/loginUser"))
app.use("/api",require("./Routes/DisplayData"))
app.use("/api",require("./Routes/orderData"))
app.use("/api",require("./Routes/addToCart"))
app.use("/api",require("./Routes/getUserInfo"))

app.use("/api",require("./AdminRoutes/additem"))

app.listen(PORT,()=>{
    console.log("server strat on port :" , PORT)
})