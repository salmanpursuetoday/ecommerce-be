const mongoose = require('mongoose');
const validator = require('mongoose-validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
  }
  ,
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [
      validator({
        validator: 'isEmail',
        message: 'Oops..please enter valid email'
      })
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  role: {
    type: String,
    enum: ['admin', 'vendor', 'customer'],
    default: 'customer'
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  contactNo: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);