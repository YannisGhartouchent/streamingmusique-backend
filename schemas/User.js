const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  dateofbirthday: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    
  },
  user_id: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  typeAccount: {
    type: String,
    required: true,
    unique: true,
  },
  setting: {
  type: String,
  required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  created_At: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
  },
});

module.exports = UserSchema;