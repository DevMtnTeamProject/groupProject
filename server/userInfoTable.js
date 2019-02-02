const mongoose = require('mongoose')

const loginSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fbId: Number,
    lastVisit: String,
    info: {
        userName: String,
        favoritesList: Array,
        personalReviews: Array,
        followers: Array,
        following: Array
    }
})

module.exports = mongoose.model('LoginUser', loginSchema)