const mongoose = require('mongoose');
// const dateFormat = require('dateformat');
const Schema = mongoose.Schema;

//create Schema
const todoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subject: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 255,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Todo', todoSchema);
