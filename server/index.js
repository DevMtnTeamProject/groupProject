const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const massive = require('massive')
const mongoose = require('mongoose')
const PORT = 4006


const Review = require('./reviewTable')

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

app.get('/review/:id', (req, res, next) => {
    const id = req.params.id

    Review.findById(id).exec().then(doc => {

        res.status(200).send(doc)
    })
})

app.post('/post-review/', (req, res, next) => {

    const review = new Review({
        _id: new mongoose.Types.ObjectId(),
        restaurantId: req.body.restaurantId,
        authorId: req.body.authorId,
        userName: req.body.userName,
        createdOn: Date.now(),
        info: req.body.info
    })
    review.save().then(result => {
        res.status(200).send(result)
    })
})




app.listen(PORT, () => {
    console.log(`Nothing like a good ${PORT} wine`)
})
