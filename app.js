// hello sanghun!
// const WebpackDevServer = require('webpack-dev-server');
// const webpack = require('webpack');
const fallback = require('express-history-api-fallback')
const express = require('express');
const cors = require('cors');
// const http = require('http');

const path = require('path');

// const config = require('./config/config');
// const aws = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const morgan = require('morgan');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const session = require('express-session');

const api = require('./routes/index');

// ---------------------express server---------------------------
const app = express();
const port = 4000;
const root = path.join(__dirname, '../client/client-side/build');
app.use(express.static(root));
app.use(fallback('index.html', {root:root}));

app.use(cors());
// ------------- 서버 변수 설정 및 static으로 public 폴더 설정  ----------- //

// app.set('port', config.server_port);
// app.use(express.static(path.join(__dirname, '../client/client-side/build')));


// bodyParser : request 객체에 body 속성을 부여함!!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// --------------------print the request log on console---------------- //
// app.use(morgan());

// ---------------------mongodb connection----------------------------- //

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mogod server'); });

// mongoose.connect(config.db_url);
// mongoose.connect('mongodb://sanghun:minho@ec2-52-78-89-87.ap-northeast-2.compute.amazonaws.com/steampack');
mongoose.connect('localhost:27017/steampack');

// ---------------------use session----------------------------- //
// https://velopert.com/406
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

/*
app.use((req, res, next) => {
  if (!req.originalUrl.includes('/dist/', 0)) {
    res.sendFile(`${__dirname}/app/index.html`);
  } else {
    next();
  }
});
*/
// ---------------------use imagme----------------------------- //
// app.use(multer({
//   dest: './uploads/',
//   rename: function (fieldname, filename) {
//     return filename;
//   },
// }));


// ---------------------router setting----------------------------- //
app.use('/api', api);

// ---------------------server setting----------------------------- //
// const server = http.createServer(app).listen(process.env.PORT || app.get('port'), () => {
//   console.log('Express is listening on port', app.get('port'));
// });

// ---------------------handle error----------------------------- //
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// ---------------------start server----------------------------- //
app.listen(port, () => {
  console.log('Express is listening on port', port);
});

// const io = socketio.listen(server);
// console.log('socket.io 요청을 받아들일 준비가 되었습니다');
//
// // 클라이언트가 연결했을 때의 이벤트 처리
// io.sockets.on('connection', (socket) => {
//   console.log('connection info : ', socket.request.connection._pername);
//
//   // 소켓 객체에 클라이언트 Host, Port 정보 속성으로 추가
//   socket.remoteAddress = socket.request.connection._pername.address;
//   socket.remotePort = socket.request.connection._pername.port;
// });


//
// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
//
// server.listen(80);
//
// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });
//
// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });
