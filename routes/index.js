const express = require('express');

const user = require('./user');
const groundDisplay = require('./ground_display');
const home = require('./home');
const account = require('./account');
const gameRegister = require('./game_register');
const profile = require('./profile');
const image = require('./image');

const router = express.Router();

router.use('/user', user);
router.use('/ground_display', groundDisplay);
router.use('/home', home);
router.use('/account', account);
router.use('/game_register', gameRegister);
router.use('/profile', profile);
router.use('/image', image);

module.exports = router;
