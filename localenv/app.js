var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// custom.
var fs = require('fs');
var readline = require('readline');
var prop = [];

/* properties */
var macroPath = path.join(__dirname, 'macro');
var csvPath = path.join(macroPath, 'conf', 'env.csv');

var getFile = function (fname) {
  var contents = fs.readFileSync(fname, "utf8");

  contents.toString().split(/\r\n|\n/).forEach(function (line) {
    console.log(line);
    prop.push(line);
  });
};

getFile(csvPath);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('prop', prop);
module.exports = app;
