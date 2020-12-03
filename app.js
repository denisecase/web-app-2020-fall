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
const pinohttp = require('pino-http')(); // faster http logger

// import additional dependencies
const engines = require('consolidate');
const expressLayouts = require('express-ejs-layouts');
const helmet = require('helmet'); // safer http headers
global.passport = require('passport');
const compression = require('compression'); // smaller=faster
const favicon = require('serve-favicon');
const LOG = require('./util/logger');

// app variables
const isProduction = process.env.NODE_ENV === 'production';
LOG.info('Environment isProduction = ', isProduction);

// create an Express app
const app = express();
LOG.info('app created');

// view engine(s) setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engines.ejs);

// set up other middleware
app.use(pinohttp);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(expressLayouts);
app.use(compression()); // compress all routes
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// set up user authentication (logging in & admin)
app.use(global.passport.initialize());
app.use(global.passport.session());

LOG.info('app initial middleware configured');

// route requests to routes/index.js
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use((req, res, err, next) => {
  LOG.error('App 404 Error Status: ', err.status);
  next(createError(404));
});

// error handler from
// https://github.com/mdn/express-locallibrary-tutorial/blob/master/app.js
app.use((req, res, err) => {
  // set locals, only providing error in development
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error', res });
});

// export the express app (helpful for testing)
module.exports = app;
