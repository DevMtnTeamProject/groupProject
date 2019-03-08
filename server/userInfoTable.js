const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fbId: Number,
  lastVisit: String,
  info: {
    userName: String,
    favoritesList: [
      {
        addedDate: Date,
        restaurantID: String,
        restaurantName: String,
        restaurantLocation: String
      }
    ],
    personalReviews:[{
      createdOn: Date,
      fbId: Number,
      info: {
          review: String,
          order: String,
          avoid: String,
          restaurantId: String,
          image: [{img:String}]
      }
  }],
    followers: [
      {
        addedDate: Date,
        fbId: Number,
        name: String
      }
    ],
    following: [
      {
        addedDate: Date,
        fbId: Number,
        name: String
      }
    ]
  }
});

module.exports = mongoose.model("LoginUser", loginSchema);
