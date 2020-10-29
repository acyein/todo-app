const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: 100,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    maxlength: 100,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
  },
});

module.exports = mongoose.model('User', userSchema);
