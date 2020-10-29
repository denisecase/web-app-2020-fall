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
const engines = require('consolidate');
const expressLayouts = require('express-ejs-layouts');
const helmet = require('helmet'); // safer http headers
global.passport = require('passport');

// app variables
const isProduction = process.env.NODE_ENV === 'production';
console.info('Environment isProduction = ', isProduction);

// create an Express app
const app = express();
console.log('app created');

// view engine(s) setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engines.ejs);

// set up other middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(expressLayouts);

// set up user authentication (logging in & admin)
app.use(global.passport.initialize());
app.use(global.passport.session());

console.log('app initial middleware configured');

// route most requests to the indexRouter
// route requests that start with /users to the usersRouter
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

console.log('app default routes configured');

// Dr. Case - rabbit
app.use('/rabbit', require('./routes/rabbit.routes'));

// Dr. Hoot - tea

// Blake - game
app.use('/game', require('./routes/game.routes'));
// Varsha - animal
app.use('/animal', require('./routes/animal.routes'));

// Felipe - ?

// Jack - chief

// Sreenidhi - student

// Sri Vasavi - food

// Joseph - software

// Stephen - whiskey
app.use('/whiskey', require('./routes/whiskey.routes'));

// Shivani - book
app.use('/book', require('./routes/book.routes'));

// Kunal - videoGame

// Chandler - company
app.use('/company', require('./routes/company.routes'));

// Praneeth - course

// Nithya - series

// Zach - fruit

// Prashansa - dance

// Sam - ship

// Lindsey - pokemon

console.log('app custom routes configured');

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler from
// https://github.com/mdn/express-locallibrary-tutorial/blob/master/app.js
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// export the express app (helpful for testing)
module.exports = app;
