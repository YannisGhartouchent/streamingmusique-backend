const mongoose = require('mongoose');

var AlbumSchema = mongoose.Schema({
    date: {
        type: Date,
    },
    artist: {
        type: ObjectId,
        required: true,

    },
    _id: {
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
})
module.exports = AlbumSchema;