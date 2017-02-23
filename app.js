var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var TwitterPrinter = require('./bin/twitter-printer.js');
var json = require('./public/json/followingUsers.json');
var follow = require('./public/json/followingUsers.json')['follow'];
var twitterPrinter = new TwitterPrinter(json);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
twitterPrinter.streamTweet();
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', users);
app.use('/index', index);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

setInterval(function() {
  console.log('check if json has changed');
  console.log(follow);
  console.log(json);
  if (follow !== json['follow']){
    console.log('json file has changed !');
    follow = json['follow'];
    twitterPrinter.changeStreamParameter(json);
  }
}, 60000);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
