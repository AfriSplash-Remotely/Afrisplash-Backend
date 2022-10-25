var createError = require('http-errors');
var express = require('express');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
var path = require('path');
var logger = require('morgan');
const cors = require("cors")
const helmet = require("helmet")
const { connectDB } = require("./config/database");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

dotenv.config({ path: "./config/config.env" });
var app = express();
//Db Connector
connectDB();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Server Security
app.use(cors())
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(logger('dev'));
}

app.use(express.json({limit : "40mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => res.send("Hello from Afrisplash"));
app.use('/api/v1', indexRouter);
app.use('/api/v1/auth', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
