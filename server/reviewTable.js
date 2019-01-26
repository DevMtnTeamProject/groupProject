const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    restaurantId: String,
    authorId: String,
    userName: String,
    createdOn: String,
    info:{
       review: String,
       order: String,
       avoid: String
    }
})

module.exports = mongoose.model('Review', reviewSchema)
