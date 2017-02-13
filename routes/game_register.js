const express = require('express');
const User = require('../models/user');

const router = express.Router();

// 프로토 타입에서는 직접 서울시의 구를 입력해놨지만, 차후 지도 API 로 업그레이드 할 예정
const seoul_borough = [
  '도봉구', '강북구', '노원구', '은평구', '성북구', '중랑구', '종로구', '동대문구',
  '서대문구', '중구', '성동구', '마포구', '용산구', '광진구', '강동구', '송파구',
  '강남구', '서초구', '동작구', '관악구', '금천구', '영등포구', '구로구', '양천구', '강서구',
];

/*
  <GAME RESISTER>
  1. 게임 생성
  2. 게임 수정
  3. 게임 확인(?)
  4. 게임 삭제

  GAME RESISTER ADD : POST /api/game_register/add
  CODY SAMPLE : { "place" : "test" , "playground": "test", "playdate" : "test" }
  ERROR CODES:
          1. BAD place
          2. BAD playground
          3. id EXISTS
*/

router.post('/', (req, res) => {

  // 1. BAD place
  if (seoul_borough.indexOf(req.body.place) === -1) {
    return res.status(400).json({
      error: 'BAD place',
      code: 1,
    });
  }

  // 2. BAD playground


})


module.exports = router;
