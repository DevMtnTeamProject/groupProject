const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdOn: String,
  info: {
    restaurantName: String,
    review: String,
    order: String,
    avoid: String,
    authorId: String,
    userName: String,
    image: Array,
    location: String,
    latLng: Object,
    place_id: String
  }
});

module.exports = mongoose.model("Review", reviewSchema);
