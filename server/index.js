const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

require('dotenv').config()



app.use(bodyParser.json())

mongoose.connect(
    process.env.MONGO_STRING,
    {
        useMongoClient: true
    }
)

const PORT = process.env.PORT || 3000

app.listen(PORT, err => {
    if (err) {
        console.error(err)
    } {
        console.log(`Nothing like a good ${PORT} wine`)
    }
})