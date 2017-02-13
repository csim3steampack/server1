// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
//
// mongoose.Promise = global.Promise; // 라우터에서 save 사용하기 위함
//
// const Schema = mongoose.Schema;
//
// const User = new Schema({
//   id: String,
//   password: String,
//   name: String,
//   team: String,
//   leader: String,
//   created: {
//     type: Date,
//     default: Date.now,
//   },
// });
//
// // use bcryptjs :  https://www.npmjs.com/package/bcryptjs#usage—sync
//
// User.methods.generateHash = function (password) {
//   return bcrypt.hashSync(password, 8);
// };
//
// User.methods.validateHash = function (password) {
//   console.log(this);
//   return bcrypt.compareSync(password, this.password);
// };
//
// module.exports = mongoose.model('user', User);
