
var mongoose = require('mongoose-q')();

var userSchema = mongoose.Schema({

  name: {
    type: String,
    required: 'User must have a name'
  },

  email: {
    type: String,
    required: 'User must have an email address'
  },

  password: {
    type: String,
    select: false,
    required: 'User must have a password'
  },

  tasteProfile: {
    likes: [String],
    dislikes: [String],
    favorites: [String],
    forbidden: [String],
    restrictions: [String]
  }

});

var User = mongoose.model('User', userSchema);

module.exports = User;
