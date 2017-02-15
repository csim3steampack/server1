const express = require('express');
const User = require('../models/user');
const TokenManager = require('../TokenManager');

const router = express.Router();

// 프로토 타입에서는 직접 서울시의 구를 입력해놨지만, 차후 지도 API 로 업그레이드 할 예정
const seoul_borough = [
  'a', '도봉구', '강북구', '노원구', '은평구', '성북구', '중랑구', '종로구', '동대문구',
  '서대문구', '중구', '성동구', '마포구', '용산구', '광진구', '강동구', '송파구',
  '강남구', '서초구', '동작구', '관악구', '금천구', '영등포구', '구로구', '양천구', '강서구',
];

/*
  게임 생성만!!
  GAME RESISTER ADD : POST /api/game_register/add
  CODY SAMPLE : { "place" : "test", "placeground" : "test", "playdate" : "test" }
  ERROR CODES:
          1. BAD place
          2. BAD placeground
          3. BAD playdate
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
    // TODO code

  // 3. BAD playdate
  // if (req.body.playdate !== 'string') {
  //   return res.status(400).json({
  //     error: 'BAD playdate',
  //     code: 2,
  //   });
  // }

  // FIND VALID ID FROM TOKEN
  const token = req.body.userToken.token;
  const getId = TokenManager.getIDFromTokenData(token);

  User.findOne({ id: getId }, (err) => {
    if (err) throw err;

    const user = new User({
      place: req.body.place,
      placeground: req.body.placeground,
      placedate: req.body.placedate,
    });

    user.save((err) => {
      if (err) throw err;
      return res.json({ success: true });
    });
  });
});


module.exports = router;
