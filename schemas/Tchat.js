const mongoose = require('mongoose');

var TchatSchema = mongoose.Schema({
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

  })


module.exports = TchatSchema;








