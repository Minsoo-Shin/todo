var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
require('express-async-errors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// error handler (4xx)
app.use((err, req, res, next) => {
  if (err.message === 'Bad_Request') {
    return res.status(400).json({ status : 400, error : err.message});
  } else if (err.message === 'Not_Authorized') {
    return res.status(401).json({ status : 401, error : err.message});
  } else if (err.message === 'Forbbiden') {
    return res.status(403).json({ status : 403, error : err.message});
  } else if (err.message === 'Not_Found') {
    return res.status(404).json({ status : 404, error : err.message});
  } else if (err.message === 'Server_Error') {
    return res.status(500).json({ status : 500, error : err.message});
  }
  next(err);
});

// error handler (3xx)
app.use((err, req, res, next) => {
  if (err.message === 'Not_modified') {
    return res.status(304).json({ status : 304, error : err.message});
  }
  next(err);
});

module.exports = app;
