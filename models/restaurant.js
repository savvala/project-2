const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  rating: Number,
  user: String
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String },
  image: { type: String},
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  comments: [commentSchema]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
