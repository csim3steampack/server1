const express = require('express');
const User = require('../models/user');
const TokenManager = require('../TokenManager');

const router = express.Router();

// 팀 두개의 정보를 제공해주는 것.
// 팀 두개의 이름
//
// /team/:teamname
// /teams?teamname=abc&teamname=abc&teamname=abc&teamname=abc&teamname=abc

// router.get('/:team', (req, res) => {
//   console.log(1);
//   console.log(req.params);
//   User.find({ team: req.params.team }, (err, user) => {
//     if (err) return res.status(500).send({ error: 'database failure' });
//     if (!user) return res.status(404).json({ error: 'team not found' });
//     return res.json(user);
//   });
// });

router.post('/', (req, res) => {

  const awayTeam = req.body.team;
  const token = req.body.userToken.token;
  const getId = TokenManager.getIDFromToken(token);

  User.findOne({ name: getId }, { team: 1, _id: 0 }, (err, data) => {
    if (err) throw err;
    const homeTeam = data.team;

    User.find({ team: homeTeam }, (err, data) => {
      if (err) throw err;
      const homeUsers = data;

      User.find({ team: awayTeam }, (err, data) => {
        if (err) throw err;
        const awayUsers = data;

        res.json({
          homeUsers,
          awayUsers,
        });
      });
    });
  });
});

module.exports = router;
