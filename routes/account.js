const express = require('express');
const User = require('../models/user');
const TokenManager = require('../TokenManager');

const router = express.Router();

/* -------------------------------------------------------
  <ACCOUNT>

  1. 회원가입
  2. 로그인
  3. 사용자 인증 확인 (토큰)
  4. 로그아웃

  CODY SAMPLE LIST :
    id,
    password,
    mail,
  -------------------------------------------------------
*/

/* -------------------------------------------------------
  ACCOUNT SIGNUP: POST /api/account/signup

  ERROR CODES:
          1. BAD id
          2. BAD password
          3. BAD mail
          4. id EXISTS
  -------------------------------------------------------
*/

router.post('/signup', (req, res) => {

    // 1. BAD id
  const idRegex = /^[a-zA-Z][a-zA-Z0-9]{3,11}$/;
  // 첫글자는 영어, 아이디는 영어소문자, 대문자 사용가능, 공백(x), 4자에서 12자 사이만 가능

  if (!idRegex.test(req.body.id)) {
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

    // 3. BAD mail
  const mailRegex = /^[-!#$%&'*+./0-9=?A-Z^_a-z{|}~]+@[-!#$%&'*+/0-9=?A-Z^_a-z{|}~]+.[-!#$%&'*+./0-9=?A-Z^_a-z{|}~]+$/;
  if (!mailRegex.test(req.body.mail)) {
    return res.status(400).json({
      eroor: 'BAD MAIL',
      code: 3,
    });
  }

  User.findOne({ id: req.body.id }, (err, exists) => {
    if (err) throw err;

    // 4. id EXISTS
    if (exists) {
      return res.status(409).json({
        error: 'ID EXISTS',
        code: 4,
      });
    }

    const user = new User({
      id: req.body.id,
      password: req.body.password,
      mail: req.body.mail,
    });

    user.password = user.generateHash(user.password);

    user.save((err) => {
      if (err) throw err;
      return res.json({ success: true });
    });
  });
});

/* -------------------------------------------------------
  <로그인>
  ACCOUNT SIGNIN: POST /api/account/SIGNIN
  ERROR CODES:
          1: LOGIN FAILED
  -------------------------------------------------------
*/

router.post('/login', (req, res) => {
  // LOGIN FAILED
  if (typeof req.body.password !== 'string') {
    return res.status(401).json({
      error: 'LOGIN FAILED_password not string',
      code: 1,
    });
  }

  User.findOne({ id: req.body.id }, (err, user) => {
    if (err) throw err;

    if (!user) {
      return res.status(401).json({
        error: 'LOGIN FAILED_not user',
        code: 1,
      });
    }

    if (!user.validateHash(req.body.password)) {
      return res.status(401).json({
        error: 'LOGIN FAILED_not password',
        code: 1,
      });
    }

    const tokenData = TokenManager.generateTokenData(user.id);
    console.log(tokenData);
    // const session = req.session;
    // session.loginInfo = {
    //   _id: user._id,
    //   id: user.id,
    // };
    // console.log(req.session);

    return res.json({
      success: true,
      tokenData,
    });
  });
});

/* ----------------------------------------------------
  <토큰 확인> 세션(x)
  GET CURRENT USER INFO GET /api/account/getinfo

  넘겨주는 값 : id
-------------------------------------------------------
*/

router.post('/getinfo', (req, res) => {

  const token = req.body.userToken.token;
  // body : userToken

  const getId = TokenManager.getIDFromToken(token);
  console.log('token', token);

  console.log('compareToken         ', getId);

  // token does not exist
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'not logged in',
    });
  }

  return res.json({
    success: true,
    info: getId,
  });
});
  // if (typeof req.session.loginInfo === 'undefined') {
  //   return res.status(401).json({
  //     error: 1,
  //   });
  // }
  //
  // User.findOne({ _id: req.session.loginInfo._id }, (err, data) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: 'NOT FIND SESSION ID',
  //     });
  //   }
  //   console.log(data.id);
  //   return res.json(data.id);
  // });
// });

/* -----------------------------------------------
  LOGOUT: POST /api/account/logout
  -------------------------------------------------
*/

router.post('/logout', (req, res) => {
  req.session.destroy((err) => { if (err) throw err; });
  return res.json({ success: true });
});


module.exports = router;
