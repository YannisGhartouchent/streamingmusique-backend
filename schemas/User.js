const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  dateofbirth: {
    type: String,
    required: true,
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
    enum: [
      "FREE",
      "Admin",
      "Premium",
    ]
  },
  setting: {
  type: mongoose.Types.ObjectId,
  required: false,
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
  quantity: {
      type: Number,
      required: false,
  }
});

module.exports = UserSchema;