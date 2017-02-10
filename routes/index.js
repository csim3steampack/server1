const express = require('express');

const user = require('./user');
const groundDisplay = require('./ground_display');
const home = require('./home');

// const account = require('./account');

const router = express.Router();

router.use('/user', user);
router.use('/ground_display', groundDisplay);
router.use('/home', home);

// rotuer.use('/account', account);

module.exports = router;
