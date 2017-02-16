// const express = require('express');
// const multer = require('multer');
//
// const router = express.Router();
//
// /*
//   multer : 파일 업로드할 때 사용하는 미들웨어
// --------------------------------------------
//   multer( {dest: '주소'}) : 기본형
//   multer({ storage: storage }) : 섬세한 표현
//   .diskStorage{
//     destination : 저장할 곳
//     filename : 파일이 저장될 때의 이름
//   }
//
//   .single(fieldname : req.file에 저장된다)
//
// */
//
// const storage = multer.diskStorage({
//
//
//   destination(req, file, cb) {
//     const basePath = 'https://s3.ap-northeast-2.amazonaws.com/steampack/';
//     // const s3Path = basePath + filePath;
//     cb(null, basePath);
//   },
//   filename(req, file, cb) {
//     // file 은 req.file을 의미한다.
//     // 업로드하는 파일의 이름과 형식을 지정해주는 uploadedFile 객체 추가
//     // file.uploadedFile = {
//     //   name: file.fieldname,
//     //   ext: file.mimetype.split('/')[1],
//     //     // mimetype: 'image/jpeg' So, ext는 뒤 확장자를 가지고 있어야 함
//     // };
//     cb(null, file.originalname);
//   },
// });
//
// // const upload = multer({ storage: storage }); // 더 섬세한 설정을 하기위해서 사용하는 표현 중의 하나
// const upload = multer({ storage });
//
//
// router.post('/', upload.single('file'), (req, res) => {
//   res.send(req.file.originalname);
// });
//
//
//
// //
// // const upload = (req, res) => {
// //   // const deferred = Q.defer();
// //   const storage = multer.diskStorage({
// //     // 서버에 저장할 폴더
// //     destinateion: (req, file, callback) => {
// //       callback(null, imagePath);
// //     },
// //     // 서버에 저장할 파일 명
// //     filename: (req, file, callback) => {
// //       file.uploadedFile = {
// //         name: req.params.filename,
// //         ext: file.mimetype.split('/')[1],
// //       };
// //       callback(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
// //     },
// //   });
// //
// //   const upload = multer({ storage: storage }).single('file');
// //   upload(req, res, (err) => {
// //     if (err) deferred.reject();
// //     else deferred.resolve(req.file.uploadedFile);
// //   });
// //
// //   return deferred.promise;
// // };
// //
// // router.post('/:filename', (req, res, next) => {
// //   console.log(req.body);
// //   upload(req, res).then( (file) => {
// //     res.json(file);
// //   }, function (err) {
// //     res.send(500, err);
// //   });
// // });
// module.exports = router;
