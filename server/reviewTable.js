const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    authorId: String,
    userName: String,
    createdOn: String,
    info:{
        text: String
    }
})

module.exports = mongoose.model('Review', reviewSchema)
