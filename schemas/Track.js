const mongoose = require('mongoose');

var TrackSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
    id: {
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

  })


module.exports = TrackSchema;