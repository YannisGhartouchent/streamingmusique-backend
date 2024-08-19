const mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ImageURL: {
    type: String,
    image: imgURL,
    required: true,
  },
  _id: {
    type: ObjectId,
    required: true,
  },
  quantity: {
      type: Number,
      required: false,
  
  },
  created_At: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
  }
  
})

module.exports = CategorySchema;