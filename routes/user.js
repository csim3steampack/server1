const express = require('express');
const User = require('../models/user');

const router = express.Router();

// GET ALL USER
router.get('/', (req, res) => {
  console.log(req)
  User.find((err, user) => {
    if (err) return res.status(500).send({ error: 'database failure' });
    return res.json(user);
  });
});

// GET TWO TEAM
// GET SINGLE TEAM
router.get('/:team', (req, res) => {
  // console.log(req.params);
  User.find({ team: req.params.team }, (err, user) => {
    if (err) return res.status(500).json({ error: err });
    if (!user) return res.status(404).json({ error: 'user not found' });
    return res.json(user);
  });
});

// CREATE USER
router.post('/', (req, res) => {
  const user = new User({
    name: req.body.name,
    team: req.body.team,
    leader: req.body.leader,
  });
  user.save((err, post) => {
    if (err) return res.status(500).json({ error: err });
    return res.json(post);
  });
});

// UPDATE USER
router.put('/:team', (req, res) => {
  User.findById(req.params.team, (err, user) => {

    if (err) return res.status(500).json({ error: 'database failure' });

    return user.save((err, put) => {
      if (err) res.status(500).json({ error: 'failed to update' });
      res.json(put);
    });
  });
});

// DELETE USER
router.delete('/', (req, res) => {
  // console.log(req.body);
  User.remove({ team: req.body.team }, (err) => {
    if (err) return res.status(500).json({ error: 'database failure' });
    return res.json('deleted!');
  });
});

module.exports = router;
