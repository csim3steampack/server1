const express = require('express');
const User = require('../models/user');

const router = express.Router();

/*
  <PROFILE>

  GAME RESISTER ADD : POST /api/game_register/add
  CODY SAMPLE : { "" : "test" , "password": "test"}
  ERROR CODES:
          1. BAD id
          2. BAD password
          3. id EXISTS
*/


module.exports = router;
