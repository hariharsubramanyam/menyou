/**
 * Lead Author: Ryan
 *
 * The model for the User.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

  username: {
    type: String,
    required: 'User must have a username'
  },

  hash_password: {
    type: String,
    required: 'User must have a password'
  },

  tasteProfile: {
    likes: [String],
    dislikes: [String],
    forbidden: [String]
  }

});

var User = mongoose.model('User', userSchema);

module.exports = User;
