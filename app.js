/** 
*  The main program for our web app. 
*
* @author Denise Case <dcase@nwmissouri.edu>
*/

// import default dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path'); // builds path strings
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// import additional dependencies
const dotenv = require('dotenv')
const engines = require('consolidate')
const helmet = require('helmet'); //safer http headers
global.passport = require('passport')

//  import local code files
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Load environment variables from .env file, where API keys and passwords are configured.
// dotenv.config({ path: '.env.example' })
dotenv.config({ path: '.env' })
console.info('Environment variables loaded.')

// app variables
const DEFAULT_PORT = 8089
const isProduction = process.env.NODE_ENV === 'production'
console.info('Environment isProduction = ', isProduction)

// create an Express app
const app = express();

// set key-value pairs to configure view engine(s)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engines.ejs)

// set up other middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set up user authentication (logging in & admin)
app.use(global.passport.initialize())
app.use(global.passport.session())

// route most requests to the indexRouter
// route requests that start with /users to the usersRouter
app.use('/', indexRouter);
app.use('/users', usersRouter);
console.info('Loaded routing.')

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

// export the express app (helpful for testing)
module.exports = app;
