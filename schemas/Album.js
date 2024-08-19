const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId

var AlbumSchema = mongoose.Schema({
    date: {
        type: Date,
    },
    artist: {
        type: ObjectId,
        required: true,

    },
    duration: {
    type: Number,
    name: String,
    date: Date,
    required: true,
  },
    created_At: {
    type: Date,
    default: new Date(),
    },
    updated_at: {
    type: Date,
    
  
  },
  quantity: {
      type: Number,
      required: false,
  }

  
})
module.exports = AlbumSchema;