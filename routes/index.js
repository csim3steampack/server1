const express = require('express');

const user = require('./user');
const ground_display = require('./ground_display');
const home = require('./home');
const account = require('./account');

const router = express.Router();

router.use('/user', user);
router.use('/ground_display', ground_display);
router.use('/home', home);
router.use('/account', account);

module.exports = router;
