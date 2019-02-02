const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const massive = require('massive')
const mongoose = require('mongoose')
const PORT = 4006

const Review = require('./reviewTable')
const LoginUser = require('./userInfoTable')

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

mongoose.connect(process.env.MONGO_STRING, { useNewUrlParser: true });

// gets reviews by restaurantId
app.get('/get-reviews/:restaurantId', (req, res, next) => {
    Review.find({ restaurantId: req.params.restaurantId }, function (err, docs) {
        res.status(200).send(docs)
    })
})

//gets user info

app.post('/login-user', (req,res, next) => {
    console.log('44444444 nyquil chill')
    res.status(200).send('testing 123')
   

    const user = LoginUser.findOne({ fbId: req.body.fbId })
    console.log('xxxxxxxxxxxx', user)
    const createUser = new LoginUser({
        _id: new mongoose.Types.ObjectId(),
        fbId: req.body.fbId,
        createdOn: Date.now(),
        info: req.body.info
    })
    createUser.save().then(result =>{
        res.status(200).send(result)
    })
})

// gets a specific review
app.get('/review/:id', (req, res, next) => {
    const id = req.params.id
    Review.findById(id).exec().then(doc => {
        res.status(200).send(doc)
    })
})

//posts review
app.post('/post-review/', (req, res, next) => {

    const review = new Review({
        _id: new mongoose.Types.ObjectId(),
        createdOn: Date.now(),
        info: req.body.info
    })
    review.save().then(result => {
        res.status(200).send(result)
    })
})



//delete a specific review
app.delete('/:delete-review',(req,res,next)=>{
    Review.remove({})
})



app.listen(PORT, () => {
    console.log(`Nothing like a good ${PORT} wine`)
})


