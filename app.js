/** 
*  The main program for our web app. 
*
* @author Denise Case <dcase@nwmissouri.edu>
*/

// import necessary dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//  import local code files
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// create an Express app
const app = express();

// set key-value pairs to configure view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set up other middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// route most requests to the indexRouter
// route requests that start with /users to the usersRouter
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler for all requests
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
