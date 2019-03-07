const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdOn: String,
  info: {
    review: String,
    order: String,
    avoid: String,
    restaurantId: String,
    authorId: String,
    userName: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
    image: Array
  }
});

module.exports = mongoose.model("Review", reviewSchema);
