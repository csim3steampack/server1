const express = require('express');
const User = require('../models/user');
const TokenManager = require('../TokenManager');


const profilePosition = [
  'ST', 'LS', 'RS', 'LF', 'CF', 'RF',
  'LAM', 'CAM', 'RAM', 'LM', 'CM', 'RM', 'LDM', 'CDM', 'RDM',
  'LB', 'CB', 'RB', 'SW',
];

const profileFoot = [
  'a', '오른발', '왼발', '양발',
];


const router = express.Router();

/* ------------------------------------------------
  <PROFILE>

  1. 프로필 생성
  2. 프로필 수정

  CODE SAMPLE LIST :
    username,
    team,
    leader: 0 || 1,
    position: into profilePosition,
    height,
    foot: into profileFoot,
  ------------------------------------------------
*/

/*------------------------------------------------
  PROFILE ADD : POST /api/profile/add
  ERROR CODES:
          1. BAD username
          2. BAD team
          3. BAD leader
          4. BAD position
          5. BAD height
          6. BAD foot
          7. ALREADY (profile) EXSIST
  ------------------------------------------------
*/

router.post('/add', (req, res) => {
  console.log('h1');
  // 1. BAD username
  const usernameRegex = /^[0-9가-힣a-zA-Z\s]{0,19}$/;
  // 영어(소문자,대문자) : 20자, 한글 : 10자, 공백사용, 숫자사용

  if (!usernameRegex.test(req.body.username)) {
    return res.status(400).json({
      eroor: 'BAD USERNAME',
      code: 1,
    });
  }

  // 2. BAD team
  const teamRegex = /^[0-9가-힣a-zA-Z\s]{0,19}$/;
  // 영어(소문자,대문자) : 20자, 한글 : 10자, 공백사용, 숫자사용

  if (!teamRegex.test(req.body.team)) {
    return res.status(400).json({
      error: 'BAD TEAM',
      code: 2,
    });
  }

  // 3. BAD leader
  const leaderCheck = ['0', '1']
  if (leaderCheck.indexOf(req.body.leader) === -1) {
    return res.status(400).json({
      error: 'BAD LEADER',
      code: 3,
    });
  }

  // 4. BAD position
  if (profilePosition.indexOf(req.body.position) === -1) {
    return res.status(400).json({
      error: 'BAD POSITION',
      code: 4,
    });
  }

  // 5. BAD height
  if (typeof req.body.height !== 'number') {
    return res.status(400).json({
      error: 'BAD HEIGHT',
      code: 5,
    });
  }

  // 6. BAD foot
  if (profileFoot.indexOf(req.body.foot) === -1) {
    return res.status(400).json({
      error: 'BAD FOOT',
      code: 6,
    });
  }

  const token = req.body.userToken.token;
  const getId = TokenManager.getIDFromTokenData(token);

  const updateData = {
    username: req.body.username,
    team: req.body.team,
    leader: req.body.leader,
    position: req.body.position,
    height: req.body.height,
    foot: req.body.foot,
  };

  User.findOne({ id: getId }, (err, data) => {
    if (err) throw err;
    User.update(data, { $set: updateData }, (err, data) => {
      if (err) throw err;
      return res.json({ success: true });
    });
  });
});

module.exports = router;
