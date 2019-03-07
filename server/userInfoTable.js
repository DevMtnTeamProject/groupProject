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
      id: mongoose.Schema.Types.ObjectId,
      createdOn: Date,
      fbID: String,
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
        fbID: String,
        name: String
      }
    ],
    following: [
      {
        addedDate: Date,
        fbID: String,
        name: String
      }
    ]
  }
});

module.exports = mongoose.model("LoginUser", loginSchema);
