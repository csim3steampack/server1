const express = require('express');
const User = require('../models/user');

const router = express.Router();

// 팀 두개의 정보를 제공해주는 것.
// 팀 두개의 이름
//
// /team/:teamname
// /teams?teamname=abc&teamname=abc&teamname=abc&teamname=abc&teamname=abc

router.get('/:team', (req, res) => {
  console.log(1);
  console.log(req.params);
  User.find({ team: req.params.team }, (err, user) => {
    if (err) return res.status(500).send({ error: 'database failure' });
    if (!user) return res.status(404).json({ error: 'team not found' });
    return res.json(user);
  });
});

// router.get('/team?:team&team', (req, res) => {
//   console.log(1);
//   console.log(req.params);
//   User.find({ team: { $all: req.params.team } }, (err, user) => {
//     if (err) return res.status(500).send({ error: 'database failure' });
//     if (!user) return res.status(404).json({ error: 'team not found' });
//     return res.json(user);
//   });
// });

module.exports = router;
