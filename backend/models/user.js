const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo",
      required: true,
    },
  ],
});

module.exports = mongoose.model('User', userSchema, 'users');
