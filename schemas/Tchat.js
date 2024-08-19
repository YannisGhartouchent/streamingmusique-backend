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
    
    },
  created_At: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
  }
  
  })


module.exports = TchatSchema;








