const mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
  name: {
    name: String,
    img: ImageURL,
    required: true,
  },
})

module.exports = MusicSchema;