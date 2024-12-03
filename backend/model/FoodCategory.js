
const mongoose = require("mongoose")

const FoodCategory  = mongoose.Schema({
    CategoryName: String
    
})

module.exports = mongoose.model("FoodCategory",FoodCategory)

