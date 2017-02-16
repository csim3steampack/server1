// // ref : http://stackoverflow.com/questions/22941535/mean-stack-file-uploads
//
// const express = require('express')
// const fs = require('fs');
// const uuid = require('uuid');
// const s3 = require('s3fs');
// const multiparty = require('connect-multiparty');
//
// const User = require('../models/user');
// const TokenManager = require('../TokenManager');
//
// const s3Impl = new s3('steampack', {
//   accessKeyId: 'AKIAJX6UXHQT675F4EUA',
//   secretAccessKey: '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',
// });
//
// const multipartyMiddleware = multiparty();
//
// const router = express.Router();
//
// router.use(multipartyMiddleware);
//
// router.post('/', (req, res) => {
//
//   const file = req.files.file; // multiparty is what allows the file to to be accessed in the req
//   const stream = fs.createReadStream(file.path);
//   const extension = file.path.substring(file.path.lastIndexOf('.'));
//   const destPath = '/' + req.user._id + '/avatar/' +  uuid.v4() + extension;
//   const base = 'https://s3.ap-northeast-2.amazonaws.com/steampack';
//
//   return s3Impl.writeFile(destPath, stream, { contentType: file.type }
//     .then (one) => {
//       fs.unlink(file.path);
//       res.send(base + destPath);
//     }
//   );
// });
//
// /sanghun/avatar/sdaklfjlk.jpg
// /minho/
//
//
//
// module.exports = router;
