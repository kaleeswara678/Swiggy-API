const mongoose = require('mongoose')

const restaurantsSchema = new mongoose.Schema({
    areaName :{
        type : String
       },

    avgRating :{
        type:Number
   },

    costForTwo :{
        type:String,
        
    },

    cuisines :{
        type:Array
    },

    name :{
        type : String,
       }
})

const Restaurant  =mongoose.model('restaurantList',restaurantsSchema)

const usersSchema = new mongoose.Schema({
    
    userName :{
        type : String, 
    },
    email :{
        type:String, 
    },
    password :{
        type:String,    
    },
    contact :{
        type: String,
    }
})

const Student =mongoose.model('customerDetails',usersSchema)
module.exports ={Restaurant,Student}
