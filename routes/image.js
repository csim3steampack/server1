const express = require('express');
const formidable = require('formidable');
// const multer = require('multer');
// const upload = multer();
const fs = require('fs');
const AWS = require('aws-sdk');

AWS.config.region = 'ap-northeast-2';
const s3 = new AWS.S3();

const User = require('../models/user')
const TokenManager = require('../TokenManager');

const router = express.Router();

/*
  TODO
  1. 팀 사진과 유저 사진을 다르게 저장 해야함
  2. 팀 사진 라우터 / 유저 사진 라우터
  3. Bucket은 임의적으로 두개로 나눌수는 있지만, Key는 어떻게 동적으로 작동하게 할 수 있을까
  4. 이미지 생성, 수정, 삭제 구현해야 함
  5. 클라이언트 측에 전달할 때는, 리스트url로 주자
*/

const Bucket = 'steampack';

// const teamKey = `team/${team}.jpeg`;
// const userKey = `user/${id}.jpeg`;


/*
  1. 유저 사진 업로드 : /api/image/user/upload
  2. 유저 사진 다운로드 : /api/image/user/image
  2. 유저 사진 수정 : /api/image/user/modify
  3. 유저 사진 삭제 : /api/image/user/delete
*/

/*
  1. 토큰을 준다
  2. 아이디를 찾는다
  3. 몽고에는 들어가지 말자
  4. s3에 저장할 때는 :::  /user/id 로 저장
*/

router.post('/user/upload', (req, res) => {

  const token = req.body.userToken.token;
  const getId = TokenManager.getIDFromToken(token);

  const userKey = `user/${getId}`;
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    const params = {
      Bucket,
      Key: userKey,
      ACL: 'public-read',
      Body: fs.createReadStream('./uploads/file.jpeg'),
    };

    s3.upload(params, (err, data) => {
      if (err) console.log(err);
      console.log('Successfully uploaded data to myBucket');
      const userImgUrl = {
        userImgUrl: data.Location,
      };

      User.findOne({ id: getId }, (err, data) => {
        if (err) throw err;
        console.log('getId된 user의 데이터', data)

        User.update(data, { $set: userImgUrl }, (err) => {
          if (err) throw err;
          return res.json('success: true');
        });
      });
    });
  });
});

router.get('/user/download', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (serr, fields, files) => {
    const params = { Bucket };

    s3.listObjects(params, (err, data) => {
      if (err) console.log(err);
      console.log('params   :', params);
      console.log('data     :', data);
      const bucketContents = data.Contents;
      const userUrls = [];

      for (let i = 0; i < bucketContents.length; i += 1) {
        const urlParams = {
          Bucket,
          Key: bucketContents[i].Key,
        };
        s3.getSignedUrl('getObject', urlParams, (err, url) => {
          if (err) console.log(err);
          userUrls.push(url);
        });
      }

      return res.send(userUrls);
    });
  });
});

module.exports = router;
