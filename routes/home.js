const express = require('express');
const User = require('../models/user');
const TokenManager = require('../TokenManager');

const router = express.Router();

router.post('/', (req, res) => {
  const token = req.body.userToken.token;
  const userId = TokenManager.getIDFromToken(token);

  User.findOne({id: userId}, (err, data) => {
    const userTeam = data.team;
      User.find({
        team: { $ne: userTeam },
        leader: { $exists: true },
        place: { $exists: true },
      }, (err, user) => {
      console.log(user);
        if (err) return res.status(500).send({ error: 'database failure' });
        if (!user) return res.status(404).json({ error: 'team not found' });
        return res.json(user);
      });
  });
});

/*
  User.find({
    id: { $ne: userId },
    leader: { $exists: true },
    place: { $exists: true },
  }, (err, user) => {
    console.log(user);
    if (err) return res.status(500).send({ error: 'database failure' });
    if (!user) return res.status(404).json({ error: 'team not found' });
    return res.json(user);
    // })
  });
});

*/
module.exports = router;
