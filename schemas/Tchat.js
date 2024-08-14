const mongoose = require('mongoose');

var TrackSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  
    group_id: {
        type: ObjectId,
        required: true,
    },
    group_name: {
        type: String,
        required: true,
    },
    member_id: {
        type: ObjectId,
        required: true,

    },
    quantity: {
      type: Number,
      required: false,
    }
  })


module.exports = TrackSchema;








