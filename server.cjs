const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const { Restaurant,Student } = require('./schema.cjs')

const app = express()
app.use(bodyParser.json())
app.use(cors())


// app.listen(4000, function () {
//     console.log('running in 8000')
// })

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://kaleeswaran:admin123@cluster0.9ydozje.mongodb.net/swiggydetails?retryWrites=true&w=majority')
        const port = process.env.PORT || 8000
        app.listen(port, function () {
            console.log(`working in ${port}`)
        })
    }
    catch (error) {
        console.log('hello, erro will occur')
        console.log(error)
        console.log('may be it takes time.<>')
    }
}

connectToDb()

        //new restaurant details is added by users>>>(API)

app.post('/add-restaurant', async function (request, response) {
    try {
        await Restaurant.create({
            "areaName": request.body.areaName,
            "avgRating": request.body.avgRating,
            "costForTwo": request.body.costForTwo,
            "cuisines": request.body.cuisines,
            "name": request.body.name
        });

        response.status(201).json({
            "status": "success",
            "message": "retuarant added !!!"
        });
    }
     catch (error) {
        response.status(500).json({
            "status": "failed",
            "message": "restaurant can't be added",
            'error': error
        });
    }
});



        //when the user request webpage node act as vendor and fetch data from the database

app.get('/get-restaurant-details', async function (request, response) {
    try {
      const restaurantDetails = await Restaurant.find();
        console.log("hi")
        response.status(200).json(restaurantDetails);
    } catch (error) {
        response.status(500).json.json({
            "status": "failed",
            "message": "can't fetch details",
            "error": error
        });
    }
});


        // creation of new user

app.post('/create-new-user', async function(request, response) {
    console.log(request.body)
    try {
         await Student.create({
             "userName" : request.body.userName,
             "email" : request.body.email,
             "password" : request.body.password,
             "contact" : request.body.contact
         })
         response.status(201).json({
         "status" : "success",
         "message" : "user created"
         })
    } catch(error) {
         response.status(500).json({
             "status" : "failure",
             "message" : "internal server error",
             "error" : error
         })
    }
 })


      // validate-users

      app.post('/validate',async function(request,response){
        try {
            const user = await Student.findOne({
                "email" : request.body.email,
                "password" : request.body.password 
            })
            if(user) {
                response.status(200).json({
                    "message" : "valid user"
                })
            } else {
                response.status(401).json({
                    "message" : "invalid user"
                })
            }
        } catch(error) {
            response.status(500).json({
                "message" : "internal server error"
            })
        }
    })