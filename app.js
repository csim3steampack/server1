// hello sanghun!
// const WebpackDevServer = require('webpack-dev-server');
// const webpack = require('webpack');

const express = require('express');
const cors = require('cors');
// const http = require('http');

const path = require('path');

// const config = require('./config/config');
// const multer = require('multer');
// const morgan = require('morgan');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const session = require('express-session');

const api = require('./routes/index');

// ---------------------express server---------------------------
const app = express();
const port = 4000;
app.use(cors());
// ------------- 서버 변수 설정 및 static으로 public 폴더 설정  ----------- //

// app.set('port', config.server_port);
app.use('../client/client-side/public', express.static(path.join(__dirname, 'public')));

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
