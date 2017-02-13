const express = require('express');
const User = require('../models/user');

const router = express.Router();

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


module.exports = router;
