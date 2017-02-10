const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  team: String,
  leader: String,
});


module.exports = mongoose.model('user', User);
