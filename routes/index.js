const express = require('express');

const user = require('./user');
const ground_display = require('./ground_display');
const home = require('./home');
const account = require('./account');
const game_register = require('./game_register');
const profile = require('./profile');
// const image = require('./image');

const router = express.Router();

router.use('/user', user);
router.use('/ground_display', ground_display);
router.use('/home', home);
router.use('/account', account);
router.use('/game_register', game_register);
router.use('/profile', profile);

// router.use('/image', image);

module.exports = router;
