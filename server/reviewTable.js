const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdOn: Date,
    fbI: String,
    info: {
        review: String,
        order: String,
        avoid: String,
        restaurantId: String,
        image: [{img:String}]
    }
})

module.exports = mongoose.model('Review', reviewSchema)
