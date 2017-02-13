// // ref : https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d#.7kmx2bbrc
//
// const express = require('express');
// const fs = require('fs');
//
// const User = require('../models/user');
//
// const router = express.Router();
//
// router.post('/', (req, res) => {
//   const user = new User();
//   user.img.data = fs.readFileSync(req.files.userPhoto.path);
//   user.img.contentType = 'image/png';
//   user.save();
// });
//
// module.exports = router;
