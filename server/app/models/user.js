
var mongoose = require('mongoose-q')();

var userSchema = mongoose.Schema({

  username: {
    type: String,
    required: 'User must have a username'
  },

  password: {
    type: String,
    select: false,
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
