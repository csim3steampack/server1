const express = require('express');
const multer = require('multer');
const fs = require('fs');

const AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
// AWS.config.loadFromPath = ''

const s3 = new AWS.S3();

const myBucket = 'steampack01';
const myKey = 'sanghun'; // aws에 머라고 저장하고 싶은지!! 즉, 내가 새로 지은 파일 이름

/*
  TODO
  1. 업로드 : putobject ---> upload
  2. 다운로드 : get object
  3. 기본적으로 왔다갔다 해놓기
  4. 조건에 맞는 형식으로 구현해야 하는데
  5. 내가 받는 것은, file (multer 기준으로)
     내가 주는 것은, aws 주소 String
*/

// --------------------------------------------------------------
// 1. 업로드

const params = {
  Bucket: myBucket,
  Key: myKey,
  ACL: 'public-read',
  Body: fs.createReadStream('uploads/file.jpeg'), // key에 들어가는 내용을 의미합니다.
};

// 원래는 putobject인데, 그러면 data에 ETag밖에 안찍힌다. 그래서 upload를 사용하도록 하자! 그러면 주소, key, Bucket도 나옴)
s3.upload(params, (err, data) => {
  console.log(data);
  if (err) console.log(err);
  else console.log('Successfully uploaded data to myBucket/mykey');
});


/*--------------------------------------------------------------
2. 다운로드
/*--------------------------------------------------------------
    (1) 이미지 자체를 다운로드
--------------------------------------------------------------*/

const params = { Bucket: myBucket, Key: myKey };
const file = fs.createWriteStream('mykey');
s3.getObject(params).createReadStream().pipe(file);

/*--------------------------------------------------------------
    (2) url 주소 하나만 가져오기 : typeof url === String
--------------------------------------------------------------*/
const urlparams = { Bucket: myBucket, Key: myKey };
s3.getSignedUrl('getObject', urlparams, (err, url) => {
  if (err) console.log(err);
  console.log(url);
});

/*--------------------------------------------------------------
    (3) Bucket에 있는 url 주소 list 가져오기
--------------------------------------------------------------*/
const params = { Bucket: myBucket };
s3.listObjects(params, (err, data) => {
  const bucketContents = data.Contents;
  for (let i = 0; i < bucketContents.length; i += 1) {
    const urlParams = {
      Bucket: myBucket,
      Key: bucketContents[i].Key,
    };
    s3.getSignedUrl('getObject', urlParams, (err, url) => {
      if (err) console.log(err);
      console.log(url);
    });
  }
});

/*--------------------------------------------------------------
--------------------------------------------------------------*/

router.post('/', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    const params = {
      Bucket: 'steampack',
      Key: 'file.jpeg',
      ACL: 'public-read',
      BODY: fs.createReadStream('')
    };
    s3.upload(params, (err, data) => {
      const result = '';
      if (err) result = 'Fail';
      else result = `<img src="${data.Location}">`;
      res.send(result);
    });
  });
});

/*--------------------------------------------------------------
  multer : 파일 업로드할 때 사용하는 미들웨어
--------------------------------------------
  multer( {dest: '주소'}) : 기본형
  multer({ storage: storage }) : 섬세한 표현
  .diskStorage{
    destination : 저장할 곳
    filename : 파일이 저장될 때의 이름
  }
  .single(fieldname : req.file에 저장된다)
--------------------------------------------------------------*/
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const basePath = 'https://s3.ap-northeast-2.amazonaws.com/steampack/';
    // const s3Path = basePath + filePath;
    cb(null, basePath);
  },
  filename(req, file, cb) {
      // file 은 req.file을 의미한다.
      // 업로드하는 파일의 이름과 형식을 지정해주는 uploadedFile 객체 추가
      file.uploadedFile = {
        name: file.fieldname,
        ext: file.mimetype.split('/')[1],
      // mimetype: 'image/jpeg' So, ext는 뒤 확장자를 가지고 있어야 함
      };
    cb(null, file.originalname);
  },
});

// const upload = multer({ storage: storage }); // 더 섬세한 설정을 하기위해서 사용하는 표현 중의 하나
const upload = multer({ storage });


router.post('/', upload.single('file'), (req, res) => {
  res.send(req.file.originalname);
});

/*------------------------------------------------------------*/

const upload = (req, res) => {
  // const deferred = Q.defer();
  const storage = multer.diskStorage({
    // 서버에 저장할 폴더
    destinateion: (req, file, callback) => {
      callback(null, imagePath);
    },
    // 서버에 저장할 파일 명
    filename: (req, file, callback) => {
      file.uploadedFile = {
        name: req.params.filename,
        ext: file.mimetype.split('/')[1],
      };
      callback(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
    },
  });

/*------------------------------------------------------------*/
