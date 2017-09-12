const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  rating: Number,
  user: String
});

const foodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  restaurant: { type: mongoose.Schema.ObjectId, ref: 'Restaurant' },
  description: { type: String },
  image: { type: String},
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  comments: [commentSchema]
});

module.exports = mongoose.model('Food', foodSchema);
