const express = require('express');
const fs = require('fs');
const AWS = require('aws-sdk');

AWS.config.region = 'ap-northeast-2';
const s3 = new AWS.S3();

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

const teamBucket = 'steampackTeam';
const teamKey = '';

const userBucket = 'steampackUser';
const userKey = '';

/*
  1. 유저 사진 업로드 : /api/image/user/upload
  2. 유저 사진 수정 : /api/image/user/modify
  3. 유저 사진 삭제 : /api/image/user/delete
*/

router.post('/user/upload', (req, res) => {
  console.log(req.file);
  // const token = req.body.userToken.token;
  // const getId = TokenManager.getIDFromToken(token);

});

module.exports = router;
