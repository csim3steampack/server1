const express = require('express');
const User = require('../models/user');

const router = express.Router();

/*
  <회원가입>
  ACCOUNT SIGNUP: POST /api/account/singup
  CODY SAMPLE : { "id" : "test" , "password": "test"}
  ERROR CODES:
          1. BAD id
          2. BAD password
          3. id EXISTS
*/

router.post('/signup', (req, res) => {

    // 1. BAD id
  // const idRegex = /^[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/; // Regex : http://sadtear.tistory.com/106

  // if (!idRegex.test(req.body.id)) {
  const length = req.body.id.length;
  if (length < 2 || length > 10) {
    return res.status(400).json({
      error: 'BAD ID',
      code: 1,
    });
  }

    // 2. BAD password
  if (req.body.password.length < 4 || typeof req.body.password !== 'string') {
    return res.status(400).json({
      error: 'BAD PASSWORD',
      code: 2,
    });
  }

  User.findOne({ id: req.body.id }, (err, exists) => {
    if (err) throw err;

    // 3. id EXISTS
    if (exists) {
      return res.status(409).json({
        error: 'ID EXISTS',
        code: 3,
      });
    }

    const user = new User({
      id: req.body.id,
      password: req.body.password,
    });

    user.password = user.generateHash(user.password);

    user.save((err) => {
      if (err) throw err;
      return res.json({ success: true });
    });
  });
});

/*
  <로그인>
  ACCOUNT SIGNIN: POST /api/account/SIGNIN
  BODY SAMPLE: { "id": "test", "password": "test" }
  ERROR CODES:
          1: LOGIN FAILED
*/

router.post('/login', (req, res) => {
  // LOGIN FAILED
  if (typeof req.body.password !== 'string') {
    return res.status(401).json({
      error: 'LOGIN FAILED',
      code: 1,
    });
  }

  User.findOne({ id: req.body.id }, (err, user) => {
    if (err) throw err;

    if (!user) {
      return res.status(401).json({
        error: 'LOGIN FAILED',
        code: 1,
      });
    }

    if (!user.validateHash(req.body.password)) {
      return res.status(401).json({
        error: 'LOGIN FAILED',
        code: 1,
      });
    }
    // console.log(session);
    const session = req.session;
    session.loginInfo = {
      _id: user._id,
      id: user.id,
    };

    return res.json({ success: true });
  });
});

/*
  <세션 확인>
  GET CURRENT USER INFO GET /api/account/getInfo
*/

router.get('/getinfo', (req, res) => {
  if (typeof req.session.loginInfo === 'undefined') {
    return res.status(401).json({
      error: 1,
    });
  }

  return res.json({ info: req.session.loginInfo });
});

/*
  LOGOUT: POST /api/account/logout
*/

router.post('/logout', (req, res) => {
  req.session.destroy((err) => { if (err) throw err; });
  return res.json({ success: true });
});


module.exports = router;
