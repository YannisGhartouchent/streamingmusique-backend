const mongoose = require('mongoose');

var ArtistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
    imageURL: {
        type: img,
        required: true,
    },
    id: {
        type: ObjectId,
        required: true,

    },
    
  created_At: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
  }
  

  })


module.exports = ArtistSchema;