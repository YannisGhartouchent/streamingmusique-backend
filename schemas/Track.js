const mongoose = require('mongoose');

var TrackSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
      album :{
        type: ObjectId,
        required: true,
    },
    imageURL: {
        type: imgURL,
        required: true,
    },
    type: {
        type: String,
        required: true,
  },
     duration: {
    type: "Number",
    required: true,
  },
     track_id: {
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

module.exports = TrackSchema;