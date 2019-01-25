const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const massive = require('massive')
const mongoose = require('mongoose')
const PORT = 4006 

const Review = require('./tables')

require('dotenv').config()

const app = express()

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false
    })
)

app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_STRING, {useNewUrlParser: true});

app.post('/post-review/',(req,res,next) =>{
    const review = new Review ({
        _id: new mongoose.Types.ObjectId(),
        authorId: req.body.auth0,
        userName: req.body.name,
        createdOn: Date.now(),
        info:{
            text: req.body.review,
            avoid: req.body.avoid
        }
    })
    review.save().then(result => {
        console.log(result)
    })
})

    


app.listen(PORT, () => {
    console.log(`Nothing like a good ${PORT} wine`)
})
