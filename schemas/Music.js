const mongoose = require('mongoose');

var MusicSchema = mongoose.Schema({
  artist: {
    type: ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  album: {
    type: ObjectId,
    required: true,
  },
  timestart: {
    type: Number,
    required: true,
  },
  timelimit: {
    type: Number,
    required: true,
  }
})
module.exports = MusicSchema;









