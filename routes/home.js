const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  User.find({ leader: 1 }, (err, user) => {
    if (err) return res.status(500).send({ error: 'database failure' });
    if (!user) return res.status(404).json({ error: 'team not found' });
    return res.json(user);
  });
});

module.exports = router;
