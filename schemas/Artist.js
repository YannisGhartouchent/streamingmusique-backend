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

  })


module.exports = ArtistSchema;